"use client";

import useLampStore from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "zustand";
import { LyricLine } from "../../../[id]/components/LyricLine";
import { SyncLyricLine } from "./SyncLyricLine";
import useUserStore from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { DOMAIN } from "@/utils/constant";

const SyncSection = ({ data }) => {
  const router = useRouter();
  const [lyrics, setLyrics] = useState(data.lyric.lyric);
  const lyric_id = useLampStore((state) => state.track.lyric);

  if (lyric_id !== data.lyric._id) router.back();

  const curTime = useLampStore((state) => state.currentTime);
  const changeHandler = useLampStore((state) => state.updateAudio);
  const changeTimeHandler = (time) => {
    changeHandler(time);
  };
  const changeSyncTimeHandller = (index, del = false) => {
    setLyrics((prev) => {
      const data = [...prev];
      data[index].start = del ? 0 : curTime.toFixed(2);
      return data;
    });
  };
  const TOKEN = useUserStore((state) => state.token);
  const timeStamps = useMemo(
    () => lyrics.map((item) => item.start),
    [lyrics]
  );
  const { mutate, isPending } = useMutation({
    mutationKey: ["sync lyric"],
    mutationFn: async () => {
      const response = await axios.post(
        DOMAIN + "/lyric/sync",
        {
          lyric: data.lyric._id,
          timestamps: timeStamps,
        },
        {
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      router.replace("/app");
      enqueueSnackbar(data.message);
    },
    onError: (data) => {
      enqueueSnackbar(data.response.data.errors.message);
    },
  });

  return (
    <div className="h-full sm:pb-16 w-full min-w-[41rem] sm:w-screen  sm:min-w-[20rem] pt-8 text-black text-lg overflow-auto  font-semibold">
      <div
        // dir="rtl"
        className="flex flex-col gap-5  items-start  pe-3 w-full   overflow-hidden"
      >
        {lyrics.map((item, i, ar) => {
          const Checkcurrent =
            curTime >= item.start && item.start !== 0;
          return (
            <SyncLyricLine
              changeSync={changeSyncTimeHandller}
              isCurrent={Checkcurrent}
              passed={curTime >= item.start ? true : false}
              detail={item}
              key={item._id}
              onClick={changeTimeHandler}
              index={i}
            />
          );
        })}
      </div>
      {!timeStamps.includes(0) && (
        <div className="flex justify-center w-full">
          {
            <button
              disabled={isPending}
              onClick={() => {
                mutate();
              }}
              className="bg-green-600 text-white px-4 py-1 rounded-lg mb-3"
            >
              Post
            </button>
          }
        </div>
      )}
    </div>
  );
};

export default SyncSection;
