import React from "react";
import PlayList from "./PlayList/PlayList";
import { DOMAIN } from "@/utils/constant";

const page = async ({ params }) => {
  const response = await fetch(DOMAIN + "/collection/" + params.id, {
    next: { tags: ["collection"] },
    cache: "no-cache",
  });
  const data = await response.json();
  if (!data) return notFound();
  return <PlayList data={data} />;
};

export default page;
