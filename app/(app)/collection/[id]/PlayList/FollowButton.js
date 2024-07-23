"use client";
import useUserStore from "@/store/userStore";
import { FillHeartSVG, HeartSVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import { getRequest } from "@/utils/getRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const FollowButton = ({ userId, type }) => {
  const queryClient = useQueryClient();
  const TOKEN = useUserStore((state) => state.token);
  const user_id = useUserStore((state) => state.user.id);
  const router = useRouter();
  const followings = useUserStore((state) => state.user.following);
  const toogleFollowings = useUserStore(
    (state) => state.toogleFollowings
  );

  const isFollow = followings?.some((item) => item === userId);

  const followHandller = async ({ id }) => {
    const response = await axios.post(
      DOMAIN + "/user/toggle-follow/" + id,
      {},
      {
        headers: { Authorization: "Bearer " + TOKEN },
      }
    );
    return response.data;
  };

  const { mutate } = useMutation({
    mutationKey: ["follow user"],
    mutationFn: followHandller,
    onSuccess: () => {
      router.refresh();
      toogleFollowings(userId);
      type === "artist" &&
        queryClient.invalidateQueries({
          queryKey: ["Followed Artist"],
        });
    },
  });
  if (user_id !== userId) {
    return (
      <button
        className="bg-neutral-800 rounded-lg text-xs text-white px-2 py-1"
        onClick={() => mutate({ id: userId })}
      >
        {isFollow ? "unfollow" : "follow"}
      </button>
    );
  }
};

export default FollowButton;
