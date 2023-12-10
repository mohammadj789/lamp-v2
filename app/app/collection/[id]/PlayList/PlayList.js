import React from "react";

import PlayListItem from "./PlayListItem";
import { InfoHeader } from "./InfoHeader";
import { notFound } from "next/navigation";
import { DOMAIN } from "@/utils/constant";

export default function PlayList(props) {
  const data = props.favorite
    ? {
        tracks: props.data.favorits,
        title: "Favorites",
        owner: { owner_name: "me" },
        type: "playlist",
      }
    : props.data.collection;

  if (!data) return notFound();

  return (
    <div className="overflow-auto h-full sm:pb-16">
      <InfoHeader
        type={data?.type}
        status={"public"}
        image={props.favorite ? "/girl.jpg" : DOMAIN + data.image}
        title={data?.title}
        credit={{
          img: "/girl.jpg",
          name: data?.owner?.owner_name,
          link: "/app",
        }}
        time={{ hour: 30, minutes: 22 }}
        count={data?.tracks?.length}
        listener={100000}
        theme={data.theme_color}
      />
      <main className="w-full text-white px-3 flex flex-col gap-3 ">
        {data.tracks.map((song, i) => (
          <PlayListItem
            key={song._id}
            id={song._id}
            image={DOMAIN + song.image}
            song={{
              title: song.title,
              artist: song.artist.artist_name,
              album: song?.album || "21",

              genre: song?.genre,
              lyric: song?.lyric,
              duration: song?.duration || 200,
            }}
            collection_id={data._id || "favorites"}
            collection={data.tracks}
            index={i}
          />
        ))}
      </main>
    </div>
  );
}
