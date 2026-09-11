import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import useUserStore from "@/store/userStore";

import { api } from "@/utils/api";

export const useFollowUser = () => {
  const toogleFollowings = useUserStore(
    (state) => state.toogleFollowings,
  );
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["follow user"],
    mutationFn: async ({ id }) => {
      const response = await api.post("/user/toggle-follow/" + id);
      return response.data;
    },
    onSuccess: (data, variables) => {
      router.refresh();
      toogleFollowings(variables.id);
      variables.type === "artist" &&
        queryClient.invalidateQueries({
          queryKey: ["Followed Artist"],
        });
    },
  });
};
