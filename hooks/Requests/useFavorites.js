import { api } from "@/utils/api";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useFavorites = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await api.get("/track/favorite");
      return response.data;
    },
  });

  return { data, isLoading };
};

export const useFavoritesMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["like"],
    mutationFn: async (id) => {
      const response = await api.post("/track/favorite/" + id);
      return response.data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });
  return mutation;
};
