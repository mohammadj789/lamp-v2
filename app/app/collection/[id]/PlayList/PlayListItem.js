"use client";
import { PauseSVG, PlaySVG } from "@/svg/Play";
import useLampStore from "@/store/store";
import React from "react";
import { convertSecondsToMMSS } from "@/utils/secondsToMuinets";

export default function PlayListItem(props) {
  const track_id = useLampStore((state) => state.track.id);
  const Collection_id = useLampStore(
    (state) => state.track.collection
  );
  const setTrack = useLampStore((state) => state.setTrack);
  const setPause = useLampStore((state) => state.togglePause);
  const play = useLampStore((state) => state.play);

  const isPlaying =
    track_id === props.id && Collection_id === props.collection;
  return (
    <div
      className="h-14 rounded-md px-3
          grid grid-cols-[auto_auto_1fr_1fr_.6fr_.2fr] md:grid-cols-[auto_auto_1fr_1fr_.2fr] sm:grid-cols-[auto_auto_1fr] gap-3 items-center hover:bg-white/20 transition-all group"
    >
      <span className="relative h-8 aspect-square flex items-center overflow-hidden">
        <span className="group-hover:hidden text-sm text-gray-400">
          {props.index + 1}
        </span>
        <span
          onClick={() => {
            isPlaying && play
              ? setPause()
              : setTrack({
                  title: props.song.title,
                  credit: props.song.artist,
                  image: props.image,
                  id: props.id,
                  lyric: props.song.lyric,
                  collection: props.collection,
                });
          }}
          className="opacity-0 h-5 group-hover:opacity-100 cursor-pointer"
        >
          {isPlaying && play ? (
            <PauseSVG width={"20px"} height={"20px"} fill={"#fff"} />
          ) : (
            <PlaySVG width={"20px"} height={"20px"} fill={"#fff"} />
          )}
        </span>
      </span>
      <img
        className="h-10 w-10 object-cover rounded-sm"
        alt="playlist thumb nail"
        src={props.image}
      />

      <div className="group font-medium flex w-auto flex-col overflow-hidden ">
        <p
          className={`font-[500] line-clamp-1 ${
            isPlaying ? "text-green-600" : ""
          }`}
        >
          {props.song.title}
        </p>
        <p className="text-xs text-gray-400 line-clamp-1 group-hover:text-white">
          {props.song.artist}
        </p>
      </div>

      <span className="line-clamp-1 overflow-hidden sm:hidden">
        {props.song.album}
      </span>
      <div className="md:hidden">{props.add || props.stream}</div>
      <span className="sm:hidden">
        {convertSecondsToMMSS(props.song.duration)}
      </span>
    </div>
  );
}
