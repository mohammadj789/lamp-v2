import useUserStore from "@/store/userStore";
import { DOMAIN } from "@/utils/constant";
import { getRequest } from "@/utils/getRequest";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useFavorites = () => {
  const TOKEN = useUserStore((state) => state.token);
  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () =>
      getRequest(DOMAIN + "/track/favorite", {
        Authorization: "Bearer " + TOKEN,
      }),
  });

  return { data, isLoading };
};
