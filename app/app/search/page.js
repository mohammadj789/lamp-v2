"use client";
import { MenuSVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import { getRequest } from "@/utils/getRequest";
import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import PlayListItem from "../collection/[id]/PlayList/PlayListItem";
import useLampStore from "@/store/store";
import { InventoryItem } from "../components/header/InventoryItem";
import Card from "../profile/[id]/profile/Card";

const Page = () => {
  const search = useRef();
  const track_id = useLampStore((state) => state.track.id);
  const { mutate, error, data, isPending } = useMutation({
    mutationKey: ["search"],
    mutationFn: () =>
      getRequest(DOMAIN + "/user/search/" + search.current.value),
    onSuccess: () => (search.current.value = ""),
  });
  const submitHandller = (e) => {
    e.preventDefault();
    if (search.current.value && search.current.value.length > 1) {
      mutate();
    }
  };
  console.log(data, isPending);

  return (
    <main className="w-full text-white px-3 flex flex-col gap-3 pt-16">
      <form onSubmit={submitHandller} className="relative">
        <span className="absolute top-1/2 -translate-y-1/2 mb-2 left-2">
          <MenuSVG fill={"#333"} />
        </span>
        <input
          ref={search}
          autoFocus
          placeholder="What are you looking for?"
          className="text-green-950 ps-9 w-full  border-2 text-xs border-green-600 rounded-lg outline-none px-3 py-2 bg-white focus:border-gray-900 hover:border-gray-900"
        />
      </form>
      {data?.tracks &&
        data?.tracks.map((track) => (
          <PlayListItem
            key={track._id}
            id={track._id}
            image={DOMAIN + track.image}
            isPlaying={track_id === track.id}
            song={{
              title: track.title,
              artist: track.artist.artist_name,
              album: track.album || "21",
              genre: track.genre || "hip hop",
              lyric: track.lyric,
              duration: track?.duration || 200,
            }}
            index={1}
          />
        ))}
      {data?.collection && (
        <div className="grid grid-cols-3 sm:grid-cols-2">
          {data?.collection.map((item) => (
            <InventoryItem
              hide
              selected
              key={item.key}
              image={item.image ? DOMAIN + item.image : "/hill.jpg"}
              title={item.title}
              id={item._id}
              type={item.type}
            />
          ))}
        </div>
      )}
      {data?.users && (
        <div className="grid grid-cols-6 sm:grid-cols-2">
          {data?.users.map((item) => (
            <Card
              type={"profile"}
              withoutBtn
              key={item._id}
              item={{
                _id: item._id,
                image: item.image,
                title: item.role.toLowerCase(),
                owner: { owner_name: item.name },
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Page;
