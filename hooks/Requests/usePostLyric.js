import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";

import { api } from "@/utils/api";

export const usePostLyric = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["post lyric"],
    mutationFn: async ({ trackId, line }) => {
      const response = await api.post("/lyric/new", {
        track: trackId,
        lyric: line,
      });
      return response.data;
    },
    onSuccess: (data) => {
      router.replace("/app");
      enqueueSnackbar(data.message);
    },
    onError: (error) => {
      enqueueSnackbar(error.response?.data?.errors?.message);
    },
  });
};
