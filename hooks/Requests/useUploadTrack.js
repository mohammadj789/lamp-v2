// hooks/useUploadTrack.js
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { api } from "@/utils/api";

export const useUploadTrack = ({ onDone } = {}) => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const uploadTrack = async ({
    file,
    title,
    genre,
    features,
    collectionId,
  }) => {
    const formData = new FormData();
    formData.append("track", file);
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("features", features);

    const response = await api.post(
      collectionId
        ? "/collection/upload/" + collectionId
        : "/track/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setProgress(
            Math.round(
              (progressEvent.loaded / progressEvent.total) * 100,
            ),
          );
        },
      },
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationKey: ["upload track"],
    mutationFn: uploadTrack,
    onError: () => setProgress(0),
    onSuccess: () => {
      setProgress(0);
      router.refresh();
      onDone?.();
    },
  });

  return { ...mutation, progress };
};
