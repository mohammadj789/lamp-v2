import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

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

export default useColloctions;
