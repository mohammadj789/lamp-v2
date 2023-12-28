import { DOMAIN } from "@/utils/constant";

import React from "react";
import { notFound } from "next/navigation";
import NewSection from "./components/SyncSection";
import SyncSection from "./components/SyncSection";
const page = async ({ params }) => {
  const response = await fetch(DOMAIN + "/lyric/" + params.id, {
    cache: "no-cache",
  });
  const data = await response.json();
  // console.log(data);

  if (
    !data ||
    data?.lyric?.is_sync ||
    data?.lyric?.status !== "accepted"
  )
    notFound();

  return (
    <main className="w-full text-white px-3 flex flex-col gap-3 pt-16 overflow-auto h-full sm:pb-14">
      <h1 className="text-white font-bold text-xl">
        Sync Lyric For {data.lyric.track.title} by{" "}
        {data.lyric.track.artist.artist_name}
      </h1>
      <SyncSection data={data} />
    </main>
  );
};

export default page;
