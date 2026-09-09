"use client";

import useColloctions from "@/hooks/Requests/useColloctions";
import { useLikeCollection } from "@/hooks/Requests/useLikeCollection";
import useUserStore from "@/store/userStore";
import { FillHeartSVG, HeartSVG } from "@/svg/Play";
import React, { useState } from "react";

const LikeCollection = ({ collection, likes, ownerId }) => {
  const [isliked, setIsliked] = useState(likes);
  const userId = useUserStore((state) => state.user.id);
  const { data } = useColloctions();
  const isFave = data?.collectioans?.wished?.some(
    (item) => item._id === collection,
  );

  const { mutate } = useLikeCollection({
    onToggle: (added) =>
      setIsliked((prev) => (added ? prev + 1 : prev - 1)),
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
