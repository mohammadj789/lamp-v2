"use client";
import useLampStore from "@/store/store";
import React from "react";
import PlayListItem from "../collection/[id]/PlayList/PlayListItem";
import { DOMAIN } from "@/utils/constant";
import QueueItem from "./components/QueueItem";

const Page = () => {
  const queue = useLampStore((state) => state.queue);
  const track = useLampStore((state) => state.track);

  return (
    <main className="w-full text-white px-3 flex flex-col gap-3 pt-16 sm:pb-14">
      {track.id && (
        <div>
          <h3>Now Playing</h3>

          <QueueItem
            id={track.id}
            image={track.image}
            isPlaying
            song={{
              title: track.title,
              artist: track.credit,
              album: track.album || "21",
              genre: track.genre || "hip hop",
              lyric: track.lyric,
              duration: track?.duration || 200,
            }}
            index={0}
          />
        </div>
      )}
      <div>
        <h3>Queue</h3>
        {queue.map((song, i) => (
          <QueueItem
            key={song._id || song.id}
            id={song._id || song.id}
            isPlaying={false}
            image={song.image}
            song={{
              title: song.title,
              artist: song.artist
                ? song.artist.artist_name
                : song.credit,
              album: song?.album || "21",
              genre: song?.genre,
              lyric: song?.lyric,
              duration: song?.duration || 200,
            }}
            index={i}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;
