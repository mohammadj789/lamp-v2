import React from "react";

export function InfoHeader(props) {
  let bottomContent;
  if (props.type === "artist")
    bottomContent = <p>{props.listener} monthly listeners</p>;
  else if (props.type === "playlist")
    bottomContent = (
      <div className="flex items-center gap-3 flex-wrap">
        <span className="flex items-center shrink-0 gap-2">
          <img
            className="h-8 w-8 rounded-full"
            alt="maker profile"
            src={props.credit.img}
          />
          <a href="/#">{props.credit.name}</a>
        </span>
        <p className="shrink-0">{props.count} songs</p>
        <span className="shrink-0">
          {props.time.hour}hr {props.time.minutes}min
        </span>
      </div>
    );
  else if (props.type === "profile")
    bottomContent = (
      <div className="flex items-center gap-3 flex-wrap">
        <span className="flex items-center shrink-0 gap-2">
          {props.user.playlistCount} Public Playlists
        </span>
        <p className="shrink-0">{props.user.followers} followers</p>
        <span className="shrink-0">
          {props.user.following} following
        </span>
      </div>
    );

  return (
    <div
      className={`w-full mb-4 pt-14 px-3 ${
        props.type === "profile" ? "h-auto" : "h-96"
      } bg-gradient-to-b from-emerald-900 to-black justify-end flex gap-5 sm:flex-col relative `}
    >
      {props.span ? (
        <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 z-0">
          <img
            className={`w-full h-full object-cover`}
            alt="playlist thumb nail"
            src={props.image}
          />
        </div>
      ) : (
        <div className="xl:w-56 w-60 sm:w-full sm:h-3/5 overflow-hidden flex items-end sm:justify-center flex-shrink-0 sm:flex-shrink">
          <img
            className={`w-full sm:h-full sm:w-auto  ${
              props.type === "profile" ? "rounded-full" : "rounded-md"
            } aspect-square object-cover`}
            alt="playlist thumb nail"
            src={props.image}
          />
        </div>
      )}

      <div className="w-full flex  items-start justify-end jus flex-col text-white z-10">
        <p>{props.status}</p>

        <h1 className="text-6xl font-bold sm:text-4xl shrink-0 line-clamp-2 mb-4 leading-[80px] sm:leading-[45px]">
          {props.title}
        </h1>

        {bottomContent}
      </div>
    </div>
  );
}
