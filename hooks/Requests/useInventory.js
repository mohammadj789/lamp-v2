import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useInventoryCollections = () => {
  const query = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const response = await api.get("/collection");
      return response.data;
    },
  });

  return query;
};

export const useInventoryArtists = () => {
  const query = useQuery({
    queryKey: ["Followed Artist"],
    queryFn: async () => {
      const response = await api.get("/user/followings/");
      return response.data;
    },
  });
  return query;
};
