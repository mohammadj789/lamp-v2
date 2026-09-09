"use client";
import { usePlayCollection } from "@/hooks/Requests/usePlayCollection";
import useLampStore from "@/store/store";

import { PauseSVG, PlaySVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import { getRequest } from "@/utils/getRequest";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export function CollectionPlay({ id }) {
  const collection = useLampStore((state) => state.track.collection);

  const play = useLampStore((state) => state.play);
  const togglePlay = useLampStore((state) => state.togglePlay);
  const togglePause = useLampStore((state) => state.togglePause);

  const { mutate } = usePlayCollection({ id });
  const clickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (collection === id) {
      if (play) togglePause();
      else togglePlay();
    } else {
      mutate();
    }
  };

  return (
    <button
      onClick={clickHandler}
      className="absolute shrink-0 p-2 bottom-1 right-1 opacity-0 transition-all translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 grid place-content-center rounded-full w-[25%] h-[25%] bg-green-500 "
    >
      {collection === id && play ? <PauseSVG /> : <PlaySVG />}
    </button>
  );
}
