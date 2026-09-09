"use client";
import {
  useFavorites,
  useFavoritesMutation,
} from "@/hooks/Requests/useFavorites";
import { FillHeartSVG, HeartSVG } from "@/svg/Play";
import { LoadingDots } from "../ui/LoadingDots";

export function LikeButton({ id }) {
  const { data } = useFavorites();
  const isfave = data?.favorits.find((item) => item._id === id);
  const { mutate, isPending } = useFavoritesMutation();

  return (
    <button
      disabled={!id}
      onClick={() => mutate(id)}
      className="flex justify-center w-8 h-full right-0 items-center text-gray-300"
    >
      {isPending ? (
        <LoadingDots />
      ) : isfave ? (
        <FillHeartSVG />
      ) : (
        <HeartSVG />
      )}
    </button>
  );
}
