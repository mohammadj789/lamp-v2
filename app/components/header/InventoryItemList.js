import React from "react";
import { InventoryItem } from "./InventoryItem";
import { DOMAIN, TOKEN } from "@/utils/constant";

const InventoryItemList = async () => {
  const CollectionResponse = await fetch(DOMAIN + "/collection", {
    headers: {
      Authorization: TOKEN,
    },
    cache: "no-cache",
  });
  const CollectionData = await CollectionResponse.json();
  const ARtistResponse = await fetch(DOMAIN + "/user/followings/", {
    headers: {
      Authorization: TOKEN,
    },
    cache: "no-cache",
  });
  const ARtistData = await ARtistResponse.json();

  const playlists = [
    ...CollectionData.collectioans.wished,
    ...CollectionData.collectioans.me,
  ];

  return (
    <div className="h-2/3 pt-3 overflow-auto">
      <InventoryItem
        image={"/hill.jpg"}
        title="Likes"
        id={"favorites"}
      />
      {playlists.map((item) => (
        <InventoryItem
          key={item._id}
          // isPlaying
          image={item.image ? DOMAIN + item.image : "/hill.jpg"}
          title={item.title}
          type={item.type}
          id={item._id}
          credit="travis scott"
        />
      ))}
      {ARtistData.artist.map((item) => (
        <InventoryItem
          key={item._id}
          image={item.image ? DOMAIN + item.image : "/hill.jpg"}
          title={item.name}
          type={"artist"}
          id={item._id}
        />
      ))}
    </div>
  );
};
export default InventoryItemList;
