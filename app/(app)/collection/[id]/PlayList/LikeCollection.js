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
import React, { useState } from "react";

const LikeCollection = ({ collection, likes, ownerId }) => {
  const [isliked, setIsliked] = useState(likes);
  const router = useRouter();
  const queryClient = useQueryClient();
  const TOKEN = useUserStore((state) => state.token);
  const userId = useUserStore((state) => state.user.id);
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });

      data.message.includes("added")
        ? setIsliked((prev) => prev + 1)
        : setIsliked((prev) => prev - 1);
    },
  });
  console.log(isliked);

  if (userId !== ownerId)
    return (
      <>
        {" "}
        <span className="shrink-0">{isliked} likes</span>
        <button
          onClick={() => {
            mutate({ playlist: collection });
          }}
        >
          {isFave ? <FillHeartSVG /> : <HeartSVG />}
        </button>
      </>
    );
};

export default LikeCollection;
