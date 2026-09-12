import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const useGetRecents = ({ taste }) => {
  const query = useQuery({
    queryKey: [taste ? "taste" : "recently played"],
    queryFn: async () => {
      const response = await api.get(
        taste ? "/user/taste" : "/user/played",
      );
      return response.data;
    },
  });
  return query;
};

export default useGetRecents;
