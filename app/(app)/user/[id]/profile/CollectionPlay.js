"use client";
import useLampStore from "@/store/store";

import { PauseSVG, PlaySVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import { getRequest } from "@/utils/getRequest";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export function CollectionPlay({ id }) {
  const collection = useLampStore((state) => state.track.collection);
  const setQ = useLampStore((state) => state.setQueue);
  const play = useLampStore((state) => state.play);
  const togglePlay = useLampStore((state) => state.togglePlay);
  const togglePause = useLampStore((state) => state.togglePause);

  const { mutate } = useMutation({
    mutationKey: ["collection_" + id],
    mutationFn: () => getRequest(DOMAIN + "/collection/" + id),
    onSuccess: ({ collection }) => {
      setQ(collection.tracks, collection._id);
    },
  });
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
      className=" absolute p-2 bottom-1 opacity-0 transition-all translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 right-1 grid place-content-center rounded-full w-1/4 aspect-square bg-green-500 text-black"
    >
      {collection === id && play ? <PauseSVG /> : <PlaySVG />}
    </button>
  );
}
