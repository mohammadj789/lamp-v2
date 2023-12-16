"use client";
import useUserStore from "@/store/userStore";
import { FillHeartSVG, HeartSVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import { getRequest } from "@/utils/getRequest";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const LikeCollection = ({ collection }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const TOKEN = useUserStore((state) => state.token);

  const { data } = useQuery({
    queryKey: ["collections"],
    queryFn: () =>
      getRequest(DOMAIN + "/collection", {
        Authorization: "Bearer " + TOKEN,
      }),
  });
  const isFave = data?.collectioans?.wished?.some(
    (item) => item._id === collection
  );

  const LikeCollection = async ({ playlist }) => {
    const response = await axios.post(
      DOMAIN + "/collection/favorite/" + playlist,
      {},
      {
        headers: { Authorization: "Bearer " + TOKEN },
      }
    );
    return response.data;
  };

  const { mutate } = useMutation({
    mutationKey: ["like collection"],
    mutationFn: LikeCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });

  return (
    <button onClick={() => mutate({ playlist: collection })}>
      {isFave ? <FillHeartSVG /> : <HeartSVG />}
    </button>
  );
};

export default LikeCollection;
