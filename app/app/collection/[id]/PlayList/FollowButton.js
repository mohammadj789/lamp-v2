"use client";
import { useFollowUser } from "@/hooks/Requests/useFollowUser";
import useUserStore from "@/store/userStore";
import React from "react";

const FollowButton = ({ userId, type }) => {
  const user_id = useUserStore((state) => state.user.id);

  const followings = useUserStore((state) => state.user.following);

  const isFollow = followings?.some((item) => item === userId);

  const { mutate } = useFollowUser();

  if (user_id !== userId) {
    return (
      <button
        className="bg-neutral-800 rounded-lg text-xs text-white px-2 py-1"
        onClick={() => mutate({ id: userId, type })}
      >
        {isFollow ? "unfollow" : "follow"}
      </button>
    );
  }
};

export default FollowButton;
