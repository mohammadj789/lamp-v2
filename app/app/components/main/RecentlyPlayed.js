"use client";
import useLampStore from "@/store/store";
import useUserStore from "@/store/userStore";
import { PauseSVG, PlaySVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import { getRequest } from "@/utils/getRequest";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function TrackPlay({ item }) {
  const setTrack = useLampStore((state) => state.setTrack);
  const setPause = useLampStore((state) => state.togglePause);
  const track_id = useLampStore((state) => state.track.id);
  const play = useLampStore((state) => state.play);
  return (
    <button
      onClick={() => {
        if (track_id === item._id && play) {
          setPause();
        } else
          setTrack({
            title: item.title,
            credit: item.artist.artist_name,
            image: item.image,
            id: item._id,
            lyric: item.lyric,
            collection: null,
          });
      }}
      className="p-2 h-2/3 grid place-content-center rounded-full aspect-square bg-green-500 text-black"
    >
      {track_id === item._id && play ? <PauseSVG /> : <PlaySVG />}
    </button>
  );
}

const RecentlyPlayed = () => {
  const TOKEN = useUserStore((state) => state.token);
  const { data } = useQuery({
    queryKey: ["recently played"],
    queryFn: () =>
      getRequest(DOMAIN + "/user/played", {
        Authorization: "Bearer " + TOKEN,
      }),
  });
  if (data?.streams.length > 0)
    return (
      <div className="px-3">
        <h3 className="font-bold mb-2">Recently played</h3>
        <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2">
          {data?.streams.map(({ TrackId: item }) => (
            <div
              key={item._id}
              className="w-full h-[8vh] bg-zinc-900 p-2 rounded-lg flex items-center gap-2"
            >
              <img
                className="h-full aspect-square rounded-md object-cover"
                src={DOMAIN + item.image}
                alt={item.title}
              />

              <span className="text-white w-full">{item.title}</span>
              <TrackPlay item={item} />
            </div>
          ))}
        </div>
      </div>
    );
};

export default RecentlyPlayed;
