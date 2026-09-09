// hooks/usePlayCollection.js
import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/api";
import useLampStore from "@/store/store";

export const usePlayCollection = ({ id }) => {
  const setQ = useLampStore((state) => state.setQueue);

  return useMutation({
    mutationKey: ["collection_" + id],
    mutationFn: async () => {
      const res = await api.get("/collection/" + id);
      return res.data;
    },
    onSuccess: ({ collection }) => {
      setQ(collection.tracks, collection._id);
    },
  });
};
