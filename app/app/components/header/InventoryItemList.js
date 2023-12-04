"use client";
import React from "react";
import { InventoryItem } from "./InventoryItem";
import { DOMAIN } from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUserStore from "@/store/userStore";

const InventoryItemList = () => {
  const TOKEN = useUserStore((state) => state.token);
  //collections
  const { data: CollectionData, isLoading: CollectionLoading } =
    useQuery({
      queryKey: ["collections"],
      queryFn: async () => {
        const response = await axios.get(DOMAIN + "/collection", {
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
        });
        return response.data;
      },
    });
  //Artists
  const { data: ARtistData, isLoading: ArtistLoading } = useQuery({
    queryKey: ["Followed Artist"],
    queryFn: async () => {
      const response = await axios.get(DOMAIN + "/user/followings/", {
        headers: {
          Authorization: TOKEN,
        },
      });
      return response.data;
    },
  });

  // const CollectionResponse = await fetch(DOMAIN + "/collection", {
  //   headers: {
  //     Authorization: TOKEN,
  //   },
  //   cache: "no-cache",
  // });
  // const CollectionData = await CollectionResponse.json();
  // const ARtistResponse = await fetch(DOMAIN + "/user/followings/", {
  //   headers: {
  //     Authorization: TOKEN,
  //   },
  //   cache: "no-cache",
  // });
  // const ARtistData = await ARtistResponse.json();
  console.log(CollectionData);

  const playlists = CollectionData
    ? [
        ...CollectionData.collectioans.wished,
        ...CollectionData.collectioans.me,
      ]
    : [];

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
      {ARtistData?.artist?.map((item) => (
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
