"use client";

import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import useUserStore from "@/store/userStore";
import { FillHeartSVG, HeartSVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { revalidateTag } from "next/cache";

export function Detail(props) {
  const detail = useStore(useLampStore, (state) => state.track);
  const TOKEN = useUserStore((state) => state.token);
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["favorites"] });
  const isfave = data?.favorits.find(
    (item) => item._id === detail.id
  );

  const FetchLike = async () => {
    const response = await fetch(
      DOMAIN + "/track/favorite/" + detail?.id,
      {
        method: "post",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      }
    );
    return await response.json();
  };

  const { mutate } = useMutation({
    mutationKey: ["like"],
    mutationFn: FetchLike,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });

  return (
    <div className="max-w-sm w-1/4 overflow-hidden flex-shrink-0 text-gray-100 flex relative items-center py-2 gap-4">
      <img
        className={`w-12 h-12 object-cover flex-shrink-0 rounded-md`}
        src={detail?.image ?? "/montain.jpg"}
        alt="inventory item"
      />
      <div className="font-medium flex w-auto flex-col">
        <p className="whitespace-nowrap font-[500]">
          {detail?.title}
        </p>

        <p className="whitespace-nowrap text-xs text-gray-400">
          {detail?.credit}
        </p>
      </div>

      <button
        disabled={!detail?.id}
        onClick={() => mutate()}
        className="flex justify-center w-8 h-full absolute right-0 bg-black items-center  text-gray-300"
      >
        {isfave ? <FillHeartSVG /> : <HeartSVG />}
      </button>
    </div>
  );
}
