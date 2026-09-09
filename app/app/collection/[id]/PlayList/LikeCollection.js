"use client";

import useColloctions from "@/hooks/Requests/useArtistColloction";
import useUserStore from "@/store/userStore";
import { FillHeartSVG, HeartSVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LikeCollection = ({ collection, likes, ownerId }) => {
  const [isliked, setIsliked] = useState(likes);
  const router = useRouter();
  const queryClient = useQueryClient();
  const TOKEN = useUserStore((state) => state.token);
  const userId = useUserStore((state) => state.user.id);
  const { data } = useColloctions();
  const isFave = data?.collectioans?.wished?.some(
    (item) => item._id === collection,
  );

  const LikeCollection = async ({ playlist }) => {
    const response = await axios.post(
      DOMAIN + "/collection/favorite/" + playlist,
      {},
      {
        headers: { Authorization: "Bearer " + TOKEN },
      },
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
