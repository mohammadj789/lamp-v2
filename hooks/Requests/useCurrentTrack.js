import { useQuery } from "@tanstack/react-query";
import useLampStore from "@/store/store";
import { DOMAIN } from "@/utils/constant";
import axios from "axios";
import useUserStore from "@/store/userStore";

export const useCurrentTrack = () => {
  const TOKEN = useUserStore((state) => state.token);
  const trackId = useLampStore((state) => state.track.id);
  return useQuery({
    queryKey: ["current-track", trackId],

    queryFn: async () => {
      const { data } = await axios.get(`${DOMAIN}/track/${trackId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return data.track;
    },

    enabled: !!trackId,

    // Don't refetch while the cached data is considered fresh
    staleTime: 1000 * 60 * 5, // 5 minutes

    // Keep unused tracks in cache for 30 minutes
    gcTime: 1000 * 60 * 30,
  });
};
