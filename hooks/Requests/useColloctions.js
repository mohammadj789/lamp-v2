import { api } from "@/utils/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useColloctions = () => {
  const query = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const response = await api.get("/collection");
      return response.data;
    },
  });
  return query;
};
export const useColloctionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["new collection"],
    mutationFn: async ({ selectedType, title }) => {
      const response = await api.post(
        "/collection/create/" + selectedType,
        { title },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

export const useAddToCollection = ({ onDone } = {}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["add to collection"],
    mutationFn: async ({ playlist, track }) => {
      const response = await api.post("/collection/add/", {
        trackID: track,
        playlistID: playlist,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      router.refresh();
      onDone?.();
    },
  });
};
export const useRemoveFromCollection = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["remove from collection"],
    mutationFn: async ({ playlist, track }) => {
      const response = await api.delete("/collection/remove-track", {
        data: { trackID: track, playlistID: playlist },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      router.refresh();
    },
  });
};
export default useColloctions;
