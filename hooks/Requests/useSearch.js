import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const useArtistSearch = () => {
  return useMutation({
    mutationKey: ["search Artist"],
    mutationFn: async (search) => {
      const response = await api.get("/user/artist/search/" + search);
      return response.data;
    },
  });
};

export default useArtistSearch;


export const useUserSearch = () => {
  return useMutation({
    mutationKey: ["search"],
    mutationFn: async (search) => {
      const response = await api.get("/user/search/" + search);
      return response.data;
    },
  });

};
