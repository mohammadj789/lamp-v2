"use client";
import React, { useState } from "react";

import { DOMAIN } from "@/utils/constant";
import PlayListItem from "@/app/app/collection/[id]/PlayList/PlayListItem";

export function ProfileTopSong(props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="w-full text-white px-3">
      <h2 className="font-bold text-2xl text-white mb-2">
        {props.title}
      </h2>
      <div className=" flex flex-col gap-1">
        {props.data.map((song, i) => {
          if (showMore ? i < 10 : i < 5)
            return (
              <PlayListItem
                key={song._id}
                id={song._id}
                image={DOMAIN + song.image}
                song={{
                  title: song.title,
                  artist: song.artist.artist_name,
                  album: song?.album || "21",
                  duration: song?.duration || 200,
                  genre: song?.genre,
                  lyric: song?.lyric,
                }}
                collection={props.id}
                index={i}
              />
            );
        })}
      </div>
      <button
        className="text-xs text-gray-300"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}
