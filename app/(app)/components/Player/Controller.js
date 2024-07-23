"use client";
import { convertSecondsToMMSS } from "@/utils/secondsToMuinets";
import { ProgressBar } from "../ui/ProgressBar";
import { ControllButtons } from "./ControllButtons";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

export function Controller() {
  const play = useLampStore((state) => state.play);

  const duration = useLampStore((state) => state.duration);
  const updateAudio = useLampStore((state) => state.updateAudio);
  const currentTime = useLampStore((state) => state.currentTime);
  const trackID = useLampStore((state) => state.track.id);

  return (
    <div className=" flex justify-center items-center w-full flex-col gap-3 max-w-[43rem]">
      <ControllButtons play={play} disabled={!trackID} />
      <div className="w-full flex items-center justify-center gap-2">
        <span className="text-[.67rem] font-medium line text-gray-400">
          {convertSecondsToMMSS(currentTime)}
        </span>

        <ProgressBar
          disabled={!trackID}
          current={currentTime}
          max={duration}
          ProgressClickHandlerr={(value) => {
            updateAudio(value);
          }}
        />

        <span className="text-[.67rem] font-medium line  text-gray-400">
          {duration ? convertSecondsToMMSS(duration) : "00:00"}
        </span>
      </div>
    </div>
  );
}
