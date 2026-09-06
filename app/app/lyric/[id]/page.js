import React, { Suspense } from "react";

import { Lyric } from "./components/Lyric";
import { notFound } from "next/navigation";
import { DOMAIN } from "@/utils/constant";

const page = async ({ params }) => {
  const response = await fetch(DOMAIN + "/lyric/" + params.id, {
    cache: "no-cache",
  });
  const data = await response.json();

  if (!data.lyric) notFound();

  return <Lyric data={data} />;
};

export default page;
