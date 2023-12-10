"use client";
import { ProgressBar } from "../ui/ProgressBar";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import {
  HighVolumeSVG,
  LowVolumeSVG,
  MediumVolumeSVG,
  MenuSVG,
  MicSVG,
  MuteVolumeSVG,
  PeopleSVG,
} from "@/svg/Play";
import Link from "next/link";

export function Optioans(props) {
  const volume = useStore(useLampStore, (state) => state.volume);
  const lyric = useStore(useLampStore, (state) => state.track.lyric);
  const mute = useStore(useLampStore, (state) => state.mute);
  const toggleMute = useLampStore((state) => state.toggleMute);
  const changeVolume = useLampStore((state) => state.changeVolume);

  let volumeState;
  if (volume === 0 || mute) volumeState = <MuteVolumeSVG />;
  else if (volume > 0.66) volumeState = <HighVolumeSVG />;
  else if (volume > 0.33) volumeState = <MediumVolumeSVG />;
  else if (volume > 0) volumeState = <LowVolumeSVG />;

  return (
    <div className="w-full max-w-[17rem] gap-1 cursor-pointer sm:hidden flex items-center">
      <Link
        href={"/app/queue"}
        className={`text-gray-400 rounded-full flex items-center h-8 w-8 p-1 hover:text-white`}
      >
        <MenuSVG />
      </Link>
      {lyric && (
        <Link
          href={"/app/lyric/" + lyric}
          className={`text-gray-400 rounded-full flex items-center h-8 w-8 p-1 hover:text-white`}
        >
          <MicSVG />
        </Link>
      )}
      <button
        className={`text-gray-400 rounded-full flex items-center h-8 w-8 p-1 hover:text-white`}
        onClick={toggleMute}
      >
        {volumeState}
      </button>

      <ProgressBar
        current={volume * 100}
        max={100}
        ProgressClickHandlerr={(value) => changeVolume(value / 100)}
      />
      <button
        className={`text-gray-400 rounded-full flex items-center h-8 w-8 p-1 hover:text-white`}
      >
        <PeopleSVG />
      </button>
    </div>
  );
}
