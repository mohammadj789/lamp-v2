import { DOMAIN } from "@/utils/constant";
import { getRequest } from "@/utils/getRequest";

import React from "react";
import { TrackPlay } from "./RecentlyPlayed";

const TopSongs = async ({ data }) => {
  return (
    <div className="px-3">
      <h3 className="font-bold mb-2">Top played Songs</h3>
      <div className="grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-2">
        {data?.tracks?.map((item) => (
          <div
            key={item._id}
            className="w-full h-[8vh] bg-zinc-900 p-2 rounded-lg flex items-center gap-2"
          >
            <img
              className="h-full aspect-square rounded-md object-cover"
              src={DOMAIN + item.image}
              alt={item.title}
            />

            <span className="text-white w-full">{item.title}</span>
            <TrackPlay item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSongs;
