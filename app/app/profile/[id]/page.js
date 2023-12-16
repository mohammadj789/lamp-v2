import React, { Suspense } from "react";

import { notFound } from "next/navigation";

import { CardRow } from "./profile/CardRow";
import { ProfileTopSong } from "./profile/ProfileTopSong";
import { DOMAIN } from "@/utils/constant";
import { InfoHeader } from "../../collection/[id]/PlayList/InfoHeader";

const Profile = async ({ params }) => {
  const response = await fetch(DOMAIN + "/user/" + params.id, {
    cache: "no-cache",
  });
  const data = await response.json();

  if (!data) notFound();
  const filtered = { playlist: [], Single: [], album: [] };
  data.profile?.Collections.forEach((item) =>
    filtered[item.type].push(item)
  );

  return (
    <div className="h-full overflow-auto sm:pb-16">
      <InfoHeader
        id={data.profile._id}
        type={data.profile?.role.toLowerCase()}
        image={DOMAIN + data.profile?.image}
        status={data.profile?.role === "ARTIST" ? "Verified" : ""}
        title={data.profile?.name}
        listener={data.profile?.listenners || 0}
        user={{
          playlistCount: data.profile?.Collections.length,
          followers: data.profile?.followers,
          followings: data.profile?.followings,
        }}
        span={data.profile?.role === "ARTIST"}
      />

      {data.profile?.role === "ARTIST" && (
        <ProfileTopSong
          title={"Popular"}
          data={data.profile.tracks}
          id={data.profile._id}
        />
      )}
      {/* <div className="p-3 grid w-full max-w-5xl gap-6 grid-cols-[repeat(6,1fr)] lg:grid-cols-[repeat(5,1fr)]  md:grid-cols-[repeat(4,1fr)] grid-flow-col sm:grid-cols-[repeat(3,1fr)] "> */}
      {filtered.Single.length > 0 && (
        <CardRow
          type={"collection"}
          title={"Single Tracks"}
          data={filtered.Single}
        />
      )}
      {filtered.album.length > 0 && (
        <CardRow
          type={"collection"}
          title={"Albums"}
          data={filtered.album}
        />
      )}
      {filtered.playlist.length > 0 && (
        <CardRow
          type={"collection"}
          title={"playlists"}
          data={filtered.playlist}
        />
      )}
    </div>
  );
};

export default Profile;
