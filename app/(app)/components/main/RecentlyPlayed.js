"use client";
import useLampStore from "@/store/store";
import useUserStore from "@/store/userStore";
import { PauseSVG, PlaySVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import { getRequest } from "@/utils/getRequest";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

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

const RecentlyPlayed = ({ taste }) => {
  const TOKEN = useUserStore((state) => state.token);
  const { data } = useQuery({
    queryKey: [taste ? "taste" : "recently played"],
    queryFn: () =>
      getRequest(DOMAIN + (taste ? "/user/taste" : "/user/played"), {
        Authorization: "Bearer " + TOKEN,
      }),
  });

  const DataTracks = taste ? data?.suggestedTracks : data?.streams;
  console.log(DataTracks);

  if (DataTracks?.length > 0)
    return (
      <div className="px-3">
        {taste ? (
          <h3 className="font-bold mb-2">Suggestions</h3>
        ) : (
          <h3 className="font-bold mb-2">Recently played</h3>
        )}
        <div className="grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-2">
          {DataTracks?.map((item) => {
            const track = taste ? item : item.TrackId;
            return (
              <div
                key={track._id}
                className="w-full h-[8vh] bg-zinc-900 p-2 rounded-lg flex items-center gap-2"
              >
                <img
                  className="h-full aspect-square rounded-md object-cover"
                  src={DOMAIN + track?.image}
                  alt={track?.title}
                />

                <span className="text-white w-full">
                  {track?.title}
                </span>
                <TrackPlay item={track} />
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default RecentlyPlayed;
