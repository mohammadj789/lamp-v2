"use client";
import { useFavorites } from "@/hooks/Requests/useFavorites";
import useUserStore from "@/store/userStore";
import { FillHeartSVG, HeartSVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

export function LikeButton({ id }) {
  const TOKEN = useUserStore((state) => state.token);
  const queryClient = useQueryClient();
  const { data } = useFavorites();

  const isfave = data?.favorits.find((item) => item._id === id);

  const FetchLike = async () => {
    const response = await axios.post(
      DOMAIN + "/track/favorite/" + id,
      {},
      { headers: { Authorization: "Bearer " + TOKEN } }
    );
    return response.data;
  };

  const { mutate } = useMutation({
    mutationKey: ["like"],
    mutationFn: FetchLike,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });

  return (
    <button
      disabled={!id}
      onClick={() => mutate()}
      className="flex justify-center w-8 h-full right-0 items-center text-gray-300"
    >
      {isfave ? <FillHeartSVG /> : <HeartSVG />}
    </button>
  );
}
