import React, { Suspense } from "react";
import PlayList from "./PlayList/PlayList";
import { DOMAIN, TOKEN } from "@/utils/constant";

const page = async ({ params }) => {
  let response;
  if (params.id === "favorites") {
    response = await fetch(DOMAIN + "/track/favorite", {
      headers: {
        Authorization: TOKEN,
      },
      cache: "no-cache",
      next: { tags: ["collection"] },
    });
  } else
    response = await fetch(DOMAIN + "/collection/" + params.id, {
      next: { tags: ["collection"] },
      cache: "no-cache",
    });

  const data = response.json();

  return (
    <Suspense fallback={<span>sssssssssssssssssssssssssss</span>}>
      <PlayList favorite={params.id === "favorites"} data={data} />
    </Suspense>
  );
};

export default page;
