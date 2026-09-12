import React from "react";
import Link from "next/link";
import LikeCollection from "./LikeCollection";
import FollowButton from "./FollowButton";
import DeleteCollection from "./DeleteCollection";
import ChangeImage from "./ChangeImage";
import ArtistLink from "./ArtistLink";

// Shared "credit" chip: maker avatar + name link. Used by playlist/single/album.
function CreditRow({ credit }) {
  return (
    <span className="flex items-center shrink-0 gap-2">
      <img
        className="h-8 w-8 rounded-full"
        alt="maker profile"
        src={credit.img}
      />
      <a
        href={
          credit.role === "ARTIST"
            ? `/app/artist/${credit.owner_Id}`
            : `/app/user/${credit.owner_Id}`
        }
      >
        {credit.name}
      </a>
    </span>
  );
}

function DurationBadge({ time }) {
  return (
    <span className="shrink-0">
      {time.hour}hr {time.minutes}min
    </span>
  );
}

function ArtistBottom({ id, listener }) {
  return (
    <div className="flex justify-between w-full pb-2">
      <p>{listener} monthly listeners</p>
      <FollowButton userId={id} type="artist" />
    </div>
  );
}

function FavoriteBottom({ count, time }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <p className="shrink-0">{count} songs</p>
      <DurationBadge time={time} />
    </div>
  );
}

function PlaylistBottom({ id, credit, count, time, likes }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <CreditRow credit={credit} />
      <p className="shrink-0">{count} songs</p>
      <DurationBadge time={time} />
      <LikeCollection
        ownerId={credit.owner_Id}
        likes={likes}
        collection={id}
      />
      <DeleteCollection collection={id} ownerId={credit.owner_Id} />
    </div>
  );
}

function UserBottom({ id, user }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="flex items-center shrink-0 gap-2">
        {user.playlistCount} Public Playlists
      </span>
      <Link href={`${id}/followers/`} className="shrink-0">
        {user.followers} followers
      </Link>
      <Link href={`${id}/followings/`} className="shrink-0">
        {user.followings} following
      </Link>
      <FollowButton userId={id} />
      <ArtistLink userId={id} />
    </div>
  );
}

function TrackBottom({ id, credit, likes }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <CreditRow credit={credit} />
      <LikeCollection
        ownerId={credit.owner_Id}
        likes={likes}
        collection={id}
      />
    </div>
  );
}

// Maps a normalized `type` to its bottom-content renderer.
const BOTTOM_CONTENT_BY_TYPE = {
  artist: ArtistBottom,
  favorite: FavoriteBottom,
  playlist: PlaylistBottom,
  user: UserBottom,
  single: TrackBottom,
  album: TrackBottom,
};

export function InfoHeader(props) {
  const normalizedType = props.type?.toLowerCase();
  const BottomContent = BOTTOM_CONTENT_BY_TYPE[normalizedType];
  const isUser = normalizedType === "user";

  return (
    <div
      style={{
        background:
          props.theme &&
          `linear-gradient(0deg, rgba(0,0,0,1) 0%, ${props.theme} 65%)`,
      }}
      className={`w-full mb-4 pt-14 px-3 ${isUser ? "h-auto" : "h-96"} bg-gradient-to-b from-emerald-900 to-black justify-end flex gap-5 sm:flex-col relative`}
    >
      {props.span ? (
        <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="playlist thumb nail"
            src={props.image}
          />
        </div>
      ) : (
        <div className="xl:w-56 w-60 sm:w-full sm:h-3/5 overflow-hidden flex items-end sm:justify-center flex-shrink-0 sm:flex-shrink">
          <div className="w-full sm:h-full sm:w-auto relative aspect-square group">
            <img
              className={`w-full h-full ${isUser ? "rounded-full" : "rounded-md"} object-cover`}
              alt="playlist thumb nail"
              src={props.image}
            />
            <ChangeImage
              profile={isUser}
              collection={props.id}
              ownerId={props?.credit?.owner_Id || props.id}
            />
          </div>
        </div>
      )}

      <div className="w-full flex items-start justify-end flex-col text-white z-10">
        <p>{props.status}</p>
        <h1 className="text-6xl font-bold sm:text-4xl shrink-0 line-clamp-2 mb-4 leading-[80px] sm:leading-[45px]">
          {props.title}
        </h1>

        {BottomContent && <BottomContent {...props} />}
      </div>
    </div>
  );
}
