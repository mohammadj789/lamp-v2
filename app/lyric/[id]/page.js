import React, { Suspense } from "react";

import { Lyric } from "./components/Lyric";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const response = await fetch(
    "http://localhost:4000/lyric/" + params.id,
    {
      cache: "no-cache",
    }
  );
  const data = await response.json();

  if (!data.lyric) notFound();

  return <Lyric data={data} />;
};

export default page;
