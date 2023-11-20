import React, { Suspense } from "react";
import PlayList from "./PlayList/PlayList";

const page = async ({ params }) => {
  const response = await fetch(
    "http://localhost:4000/collection/" + params.id,
    {
      cache: "no-cache",
    }
  );
  const data = response.json();
  return (
    <Suspense fallback={<span>sssssssssssssssssssssssssss</span>}>
      {" "}
      <PlayList data={data} />
    </Suspense>
  );
};

export default page;
