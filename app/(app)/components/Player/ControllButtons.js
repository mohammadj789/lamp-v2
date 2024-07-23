"use client";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import {
  NextSVG,
  PauseSVG,
  PlaySVG,
  PreviousSVG,
  RepeatSVG,
  ShuffleSVG,
} from "@/svg/Play";
export function ControllButtons(props) {
  const setPlayHandler = useLampStore((state) => state.togglePlay);
  const setPauseHandler = useLampStore((state) => state.togglePause);

  return (
    <div className="flex gap-6 sm:gap-0 justify-between items-center">
      <button
        disabled={props.disabled}
        className={`text-gray-400 rounded-full ${
          props.size ?? "h-8 w-8"
        } p-1  hover:text-white`}
        onClick={setPlayHandler}
      >
        <ShuffleSVG
          width={props.svgsize ?? "23px"}
          height={props.svgsize ?? "23px"}
        />
      </button>
      <button
        disabled={props.disabled}
        className={`text-gray-400 rounded-full ${
          props.size ?? "h-8 w-8"
        } p-1  hover:text-white`}
        onClick={setPlayHandler}
      >
        <PreviousSVG
          width={props.svgsize ?? "23px"}
          height={props.svgsize ?? "23px"}
        />
      </button>
      {!props.play ? (
        <button
          disabled={props.disabled}
          className={`flex items-center justify-center bg-white text-black rounded-full flex-shrink-0 ${
            props.size ?? "h-8 w-8"
          } ps-[.4rem]  p-1`}
          onClick={setPlayHandler}
        >
          <PlaySVG
            width={props.playsize ?? "19px"}
            height={props.playsize ?? "19px"}
          />
        </button>
      ) : (
        <button
          disabled={props.disabled}
          className={`flex items-center justify-center bg-white text-black rounded-full flex-shrink-0 ${
            props.size ?? "h-8 w-8"
          } `}
          onClick={setPauseHandler}
        >
          <PauseSVG
            width={props.pausesize ?? "21px"}
            height={props.pausesize ?? "21px"}
          />
        </button>
      )}
      <button
        disabled={props.disabled}
        className={`text-gray-400 rounded-full ${
          props.size ?? "h-8 w-8"
        } p-1  hover:text-white`}
        onClick={setPlayHandler}
      >
        <NextSVG
          width={props.svgsize ?? "23px"}
          height={props.svgsize ?? "23px"}
        />
      </button>
      <button
        disabled={props.disabled}
        className={`text-gray-400 rounded-full ${
          props.size ?? "h-8 w-8"
        } p-1  hover:text-white`}
        onClick={setPlayHandler}
      >
        <RepeatSVG
          width={props.svgsize ?? "23px"}
          height={props.svgsize ?? "23px"}
        />
      </button>
    </div>
  );
}
