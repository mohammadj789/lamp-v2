// hooks/useSyncLyric.js
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import { api } from "@/utils/api";

export const useSyncLyric = () => {
  const { replace } = useRouter();

  return useMutation({
    mutationKey: ["sync lyric"],
    mutationFn: async ({ lyricId, timeStamps }) => {
      const response = await api.post("/lyric/sync", {
        lyric: lyricId,
        timestamps: timeStamps,
      });
      return response.data;
    },
    onSuccess: (data) => {
      replace("/app");
      enqueueSnackbar(data.message);
    },
    onError: (error) => {
      enqueueSnackbar(error.response?.data?.errors?.message);
    },
  });
};
