"use client";
import { convertSecondsToMMSS } from "@/utils/secondsToMuinets";
import { ProgressBar } from "../ui/ProgressBar";
import { ControllButtons } from "./ControllButtons";
import { Transition } from "react-transition-group";
import useUiStore from "@/store/uiStore";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import { DownSVG, HeartSVG, OptionSVG } from "@/svg/Play";
function MobileFullPlayer(props) {
  const fullPlayer = useUiStore((state) => state.fullPlayer);
  const toggleFullPlayer = useUiStore(
    (state) => state.toggleFullPlayer
  );
  const detail = useStore(useLampStore, (state) => state.track);

  const play = useStore(useLampStore, (state) => state.play);

  const currentTime = useStore(
    useLampStore,
    (state) => state.currentTime
  );
  const duration = useStore(useLampStore, (state) => state.duration);
  const setPlayHandler = useLampStore((state) => state.togglePlay);
  const setPauseHandler = useLampStore((state) => state.togglePause);
  const updateAudio = useLampStore((state) => state.updateAudio);

  return (
    <Transition
      mountOnEnter
      unmountOnExit
      in={fullPlayer}
      timeout={150}
    >
      {(state) => (
        <div
          className={`fixed hidden sm:flex gap-6 flex-col z-50 bg-slate-700 w-full h-full translate-y-[100%] transition-all text-white  p-3 overflow-hidden ${
            state === "entered" || state === "entering"
              ? "!translate-y-[0]"
              : ""
          }`}
        >
          <div className=" h-20 flex-shrink-0 flex justify-between items-center">
            <button
              onClick={toggleFullPlayer}
              className="flex justify-center items-center min-w-[48px]"
            >
              <DownSVG />
            </button>
            <p className="w-full text-center text-[.7rem] font-medium">
              {detail.credit}
            </p>
            <button className="flex justify-center items-center min-w-[48px]">
              <OptionSVG />
            </button>
          </div>
          <div className="h-full w-full flex items-center justify-center">
            <img
              src={
                detail.image
                  ? "http://localhost:4000" + detail.image
                  : "/hill.jpg"
              }
              className="h-auto w-full aspect-square rounded max-w-xs max-h-80 object-cover "
              alt=" cover"
            />
          </div>
          <div className=" h-64 flex-shrink-0 overflow-hidden flex flex-col justify-between pb-7">
            <div className="flex">
              <div className="flex flex-col w-full overflow-hidden px-2">
                <p className="whitespace-nowrap text-white text-2xl font-bold">
                  {detail.title}
                </p>
                <p className="whitespace-nowrap text-base font-normal text-gray-300">
                  {detail.credit}
                </p>
              </div>
              <button className="flex justify-center items-center min-w-[48px] text-gray-300">
                <HeartSVG />
              </button>
            </div>
            <div className="flex flex-col px-2">
              <ProgressBar
                opacity
                height={"h-2"}
                current={currentTime}
                max={duration}
                ProgressClickHandlerr={updateAudio}
              />
              <div className="flex justify-between">
                <p className="text-xs text-gray-300">
                  {convertSecondsToMMSS(currentTime)}
                </p>
                <p className="text-xs text-gray-300">
                  {duration
                    ? convertSecondsToMMSS(duration)
                    : "00:00"}
                </p>
              </div>
            </div>

            <ControllButtons
              play={play}
              setPlayHandler={setPlayHandler}
              setPauseHandler={setPauseHandler}
              size="h-14 w-14"
              playsize={"25px"}
              pausesize={"30px"}
              svgsize={"32px"}
            />
          </div>
        </div>
      )}
    </Transition>
  );
}
export default MobileFullPlayer;
