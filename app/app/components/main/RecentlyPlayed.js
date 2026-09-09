"use client";
import useGetRecents from "@/hooks/Requests/usegetRecents";
import useLampStore from "@/store/store";
import { PauseSVG, PlaySVG } from "@/svg/Play";
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
            id: item._id,
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
  const { data } = useGetRecents({ taste });

  const DataTracks = taste ? data?.suggestedTracks : data?.streams;

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
                  src={track?.image}
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
