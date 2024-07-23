import { DOMAIN } from "@/utils/constant";

import React from "react";
import { notFound } from "next/navigation";
import NewSection from "./components/NewSection";
const page = async ({ params }) => {
  const response = await fetch(DOMAIN + "/track/" + params.id, {
    cache: "no-cache",
  });
  const data = await response.json();
  console.log(data);

  if (!data || data?.errors || data?.track?.lyric) notFound();

  return (
    <main className="w-full text-white px-3 flex flex-col gap-3 pt-16 overflow-auto h-full sm:pb-14">
      <h1 className="text-white font-bold text-xl">
        New Lyric For {data.track.title} by{" "}
        {data.track.artist.artist_name}
      </h1>
      <NewSection data={data} />
    </main>
  );
};

export default page;
