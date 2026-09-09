import { useQuery } from "@tanstack/react-query";

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
