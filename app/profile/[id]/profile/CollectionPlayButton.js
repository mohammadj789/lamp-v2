import { PlaySVG } from "@/svg/Play";
import React from "react";

export const CollectionPlayButton = () => {
  return (
    <button className="absolute p-2 bottom-1 opacity-0 transition-all translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 right-1 grid place-content-center rounded-full w-1/4 aspect-square bg-green-500 text-black">
      <PlaySVG />
    </button>
  );
};
