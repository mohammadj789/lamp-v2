"use client";
import { useEffect, useRef } from "react";
import { LyricLine } from "./LyricLine";
import useLampStore from "@/store/store";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Lyric({ data }) {
  const router = useRouter();
  const lyric_id = useLampStore((state) => state.track.lyric);
  if (lyric_id !== data.lyric._id) router.back();

  const next = useRef();
  const curTime = useStore(
    useLampStore,
    (state) => state.currentTime
  );
  const changeHandler = useLampStore((state) => state.updateAudio);

  const changeTimeHandler = (time) => {
    changeHandler(time);
  };

  useEffect(() => {
    next?.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [curTime]);

  return (
    <div
      style={{ backgroundColor: data.lyric.track.theme_color ?? "" }}
      className="h-full sm:pb-16 w-full min-w-[41rem] sm:w-screen  sm:min-w-[20rem] pt-8 text-black text-lg overflow-auto bg-orange-600 font-semibold"
    >
      <div
        // dir="rtl"
        className="flex flex-col gap-5 rtl:items-end rtl:pe-40 rtl:ps-3 items-start ps-40 pe-3 w-full sm:rtl:pe-6 sm:ps-6 overflow-hidden"
      >
        {data.lyric.lyric.map((item, i, ar) => {
          const Checkcurrent =
            curTime >= item.start && curTime <= ar?.[i + 1]?.start;
          return (
            <LyricLine
              sync={data.lyric.is_sync}
              ref={Checkcurrent ? next : undefined}
              isCurrent={Checkcurrent}
              passed={curTime >= item.start ? true : false}
              detail={item}
              key={item.start}
              onClick={changeTimeHandler}
            />
          );
        })}
      </div>
      {!data.lyric.is_sync && (
        <div className="flex justify-center w-full mt-4">
          {
            <Link
              href={"/app/lyric/sync/" + data.lyric._id}
              className="bg-zinc-500 text-white px-4 py-1 rounded-lg mb-3"
            >
              Sync
            </Link>
          }
        </div>
      )}
    </div>
  );
}
