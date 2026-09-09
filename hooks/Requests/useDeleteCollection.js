// hooks/useDeleteCollection.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteCollection = async (collectionId) => {
    const response = await api.delete(
      "/collection/delete/" + collectionId,
    );
    return response.data;
  };

  return useMutation({
    mutationKey: ["delete collection"],
    mutationFn: deleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      router.replace("/app");
    },
  });
};
