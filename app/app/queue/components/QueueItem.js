"use client";
import { HeartSVG, MenuSVG, PauseSVG, PlaySVG } from "@/svg/Play";
import useLampStore from "@/store/store";
import React, { useState } from "react";
import { convertSecondsToMMSS } from "@/utils/secondsToMuinets";
import { LikeButton } from "@/app/app/components/Player/LikeButton";
import ClickAwayListener from "react-click-away-listener";
import { MenueButton } from "../../collection/[id]/PlayList/MenueButton";

export default function QueueItem(props) {
  const chageCurrentQueue = useLampStore(
    (state) => state.chageCurrentQueue
  );
  const isPlaying = false;
  return (
    <div
      onClick={() => chageCurrentQueue(props.index)}
      className="h-14 rounded-md px-3 cursor-pointer
          grid grid-cols-[auto_1fr_1fr_.2fr_auto] md:grid-cols-[auto_1fr_1fr_.2fr_auto] sm:grid-cols-[auto_1fr_auto] gap-3 items-center hover:bg-white/20 transition-all group"
    >
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

      <span className="sm:hidden">
        {convertSecondsToMMSS(props.song.duration)}
      </span>

      <MenueButton
        id={props.id}
        credit={props.song.artist}
        image={props.image}
        lyric={props.song.lyric}
        title={props.song.title}
        queue
      />
    </div>
  );
}
