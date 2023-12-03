"use client";
import { ProgressBar } from "../ui/ProgressBar";
import useLampStore from "@/store/store";
import useUiStore from "@/store/uiStore";
import { useStore } from "@/store/useStore";
import { HeartSVG, PauseSVG, PlaySVG } from "@/svg/Play";
function MobilePlayer(props) {
  const duration = useStore(useLampStore, (state) => state.duration);

  const toggleFullPlayer = useUiStore(
    (state) => state.toggleFullPlayer
  );
  const play = useStore(useLampStore, (state) => state.play);
  const detail = useStore(useLampStore, (state) => state.track);

  const currentTime = useStore(
    useLampStore,
    (state) => state.currentTime
  );
  const setPlayHandler = useLampStore((state) => state.togglePlay);
  const setPauseHandler = useLampStore((state) => state.togglePause);
  return (
    <div className="h-14 hidden pt-[.35rem] px-2 sm:grid rounded-md grid-cols-1 overflow-hidden bg-amber-500 w-[calc(100%-1rem)] fixed bottom-20 mx-2">
      <div className="flex gap-2 items-center">
        <img
          onClick={toggleFullPlayer}
          className={`w-10 h-10 object-cover flex-shrink-0 rounded-sm`}
          src={"/girl.jpg" ?? "/montain.jpg"}
          alt="inventory item"
        />
        <div
          onClick={toggleFullPlayer}
          className="font-medium flex flex-col w-full overflow-hidden"
        >
          <p className="whitespace-nowrap font-[500]">
            {detail?.title}
          </p>
          <p className="whitespace-nowrap text-xs">
            {detail?.credit}
          </p>
        </div>
        <div className="flex items-center justify-around min-w-[88px]">
          <button className="flex items-center">
            <HeartSVG />
          </button>

          {!play ? (
            <button
              className="flex items-center"
              onClick={setPlayHandler}
            >
              <PlaySVG width={"26px"} height={"26px"} />
            </button>
          ) : (
            <button
              className="flex items-center"
              onClick={setPauseHandler}
            >
              <PauseSVG
                width={props.pausesize ?? "26px"}
                height={props.pausesize ?? "26px"}
              />
            </button>
          )}
        </div>
      </div>
      <div className="self-end pointer-events-none">
        <ProgressBar
          height="h-[.15rem]"
          current={currentTime}
          max={duration}
        />
      </div>
    </div>
  );
}
export default MobilePlayer;
