import React from "react";

import { notFound } from "next/navigation";

import { DOMAIN } from "@/utils/constant";
import { InfoHeader } from "../../collection/[id]/PlayList/InfoHeader";
import { ProfileTopSong } from "../../user/[id]/profile/ProfileTopSong";
import { CardRow } from "../../user/[id]/profile/CardRow";
import ArtistSection from "../components/ArtistSection";

const Profile = async ({ params }) => {
  const response = await fetch(DOMAIN + "/user/" + params.id, {
    cache: "no-cache",
  });
  const data = await response.json();

  if (!data || data.profile?.role !== "ARTIST") notFound();
  const filtered = { playlist: [], Single: [], album: [] };
  data.profile?.Collections.forEach((item) =>
    filtered[item.type].push(item)
  );

  return (
    <div className="h-full overflow-auto sm:pb-16">
      <InfoHeader
        id={data.profile._id}
        type={"artist"}
        image={
          data.profile?.image ? DOMAIN + data.profile?.image : ""
        }
        status={"Verified"}
        title={data.profile?.name}
        listener={data.profile?.listenners || 0}
        span
      />
      <ArtistSection userId={data.profile._id} />
      <ProfileTopSong
        title={"Popular"}
        data={data.profile.tracks}
        id={data.profile._id}
      />

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
    </div>
  );
};

export default Profile;
