"use client";
import { useDeleteCollection } from "@/hooks/Requests/useDeleteCollection";
import useUserStore from "@/store/userStore";
import { TrashSVG } from "@/svg/Play";
import React from "react";

const DeleteCollection = ({ collection, ownerId }) => {
  const userId = useUserStore((state) => state.user.id);

  const { mutate } = useDeleteCollection();

  if (userId === ownerId) {
    return (
      <button onClick={() => mutate(collection)}>
        <TrashSVG />
      </button>
    );
  }
};

export default DeleteCollection;
