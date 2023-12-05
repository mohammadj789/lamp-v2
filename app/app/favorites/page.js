"use client";
import React from "react";
import PlayList from "../collection/[id]/PlayList/PlayList";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@/store/userStore";
import { DOMAIN } from "@/utils/constant";
import axios from "axios";

const Page = () => {
  const TOKEN = useUserStore((state) => state.token);
  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const response = await axios.get(DOMAIN + "/track/favorite", {
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      });
      return response.data;
    },
  });
  if (data) return <PlayList favorite data={data} />;
};
export default Page;
