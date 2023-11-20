"use client";
import { convertSecondsToMMSS } from "@/utils/secondsToMuinets";
import { ProgressBar } from "../ui/ProgressBar";
import { ControllButtons } from "./ControllButtons";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import { useEffect } from "react";

export function Controller() {
  const play = useStore(useLampStore, (state) => state.play);

  const duration = useStore(useLampStore, (state) => state.duration);
  const updateAudio = useLampStore((state) => state.updateAudio);
  const currentTime = useStore(
    useLampStore,
    (state) => state.currentTime
  );

  return (
    <div className=" flex justify-center items-center w-full flex-col gap-3 max-w-[43rem]">
      <ControllButtons play={play} />
      <div className="w-full flex items-center justify-center gap-2">
        <span className="text-[.67rem] font-medium line text-gray-400">
          {convertSecondsToMMSS(currentTime)}
        </span>

        <ProgressBar
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
