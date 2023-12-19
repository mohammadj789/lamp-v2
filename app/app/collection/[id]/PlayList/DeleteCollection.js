"use client";
import useUserStore from "@/store/userStore";
import { TrashSVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteCollection = ({ collection, ownerId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const TOKEN = useUserStore((state) => state.token);
  const userId = useUserStore((state) => state.user.id);

  const DeleteCollection = async () => {
    const response = await axios.delete(
      DOMAIN + "/collection/delete/" + collection,
      {
        headers: { Authorization: "Bearer " + TOKEN },
      }
    );
    return response.data;
  };

  const { mutate } = useMutation({
    mutationKey: ["delete collection"],
    mutationFn: DeleteCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      router.replace("/app");
    },
  });

  if (userId === ownerId) {
    return (
      <button onClick={mutate}>
        <TrashSVG />
      </button>
    );
  }
};

export default DeleteCollection;
