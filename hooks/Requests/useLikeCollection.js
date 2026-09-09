import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/utils/api";

export const useLikeCollection = ({ onToggle } = {}) => {
  const queryClient = useQueryClient();

  const likeCollection = async ({ playlist }) => {
    const response = await api.post(
      "/collection/favorite/" + playlist,
    );
    return response.data;
  };

  return useMutation({
    mutationKey: ["like collection"],
    mutationFn: likeCollection,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      onToggle?.(data.message.includes("added"));
    },
  });
};
