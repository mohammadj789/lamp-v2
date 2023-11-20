import React from "react";

import PlayListItem from "./PlayListItem";
import { InfoHeader } from "./InfoHeader";
import { notFound } from "next/navigation";

export default async function PlayList(props) {
  const data = (await props.data).collection;

  if (!data) return notFound();

  return (
    <div className="overflow-auto h-full sm:pb-16">
      <InfoHeader
        type={data.type}
        status={"public"}
        image={"http://localhost:4000" + data.image}
        title={data.title}
        credit={{
          img: "/girl.jpg",
          name: data.owner.owner_name,
          link: "/",
        }}
        time={{ hour: 30, minutes: 22 }}
        count={data.tracks.length}
        listener={100000}
      />
      <main className="w-full text-white px-3 flex flex-col gap-3 ">
        {data.tracks.map((song, i) => (
          <PlayListItem
            item={song}
            key={song._id}
            id={song._id}
            image={"http://localhost:4000" + song.image}
            song={{
              title: song.title,
              artist: song.artist.artist_name,
              album: "21",
              duration: "4:45",
              genre: song?.genre,
              lyric: song?.lyric,
            }}
            index={i}
          />
        ))}
      </main>
    </div>
  );
}
