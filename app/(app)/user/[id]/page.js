import React, { Suspense } from "react";

import { notFound } from "next/navigation";

import { DOMAIN } from "@/utils/constant";
import { InfoHeader } from "../../collection/[id]/PlayList/InfoHeader";
import { CardRow } from "./profile/CardRow";

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
    <div className="h-full overflow-auto sm:pb-16 ">
      <InfoHeader
        id={data.profile._id}
        type={"user"}
        image={
          data.profile?.image ? DOMAIN + data.profile?.image : ""
        }
        title={data.profile?.name}
        user={{
          playlistCount: data.profile?.Collections.filter(
            (item) => item.type === "playlist"
          ).length,
          followers: data.profile?.followers,
          followings: data.profile?.followings,
        }}
      />

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
