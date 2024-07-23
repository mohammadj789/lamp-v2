import React, { Suspense } from "react";

import { Lyric } from "./components/Lyric";
import { notFound } from "next/navigation";
import { DOMAIN } from "@/utils/constant";
import { ReadableColor } from "@/utils/ReadableColor";

const page = async ({ params }) => {
  const response = await fetch(DOMAIN + "/lyric/" + params.id, {
    cache: "no-cache",
  });
  const data = await response.json();
  console.log(data);

  if (!data.lyric) notFound();
  console.log(data);
  console.log(ReadableColor(data.lyric.track.theme_color));

  return <Lyric data={data} />;
};

export default page;
