"use client";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import React from "react";

const ArtistLink = ({ userId, type }) => {
  const user_id = useUserStore((state) => state.user.id);
  const role = useUserStore((state) => state.user.role);
  console.log(role);

  if (user_id === userId && role === "ARTIST") {
    return (
      <Link
        className="bg-neutral-800 rounded-lg text-xs text-white px-2 py-1"
        href={"/app/artist/" + user_id}
      >
        Artist profile
      </Link>
    );
  }
};

export default ArtistLink;
