"use client";

import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import { revalidateTag } from "next/cache";
import { LikeButton } from "./LikeButton";

export function Detail(props) {
  const detail = useStore(useLampStore, (state) => state.track);

  return (
    <div className="max-w-sm w-1/4 overflow-hidden flex-shrink-0 text-gray-100 flex relative items-center py-2 gap-4">
      <img
        className={`w-12 h-12 object-cover flex-shrink-0 rounded-md`}
        src={detail?.image ?? "/montain.jpg"}
        alt="inventory item"
      />
      <div className="font-medium flex w-auto flex-col">
        <p className="whitespace-nowrap font-[500]">
          {detail?.title}
        </p>

        <p className="whitespace-nowrap text-xs text-gray-400">
          {detail?.credit}
        </p>
      </div>

      <LikeButton id={detail?.id} />
    </div>
  );
}
