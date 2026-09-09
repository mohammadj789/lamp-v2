// hooks/useUpdateThumbnail.js
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import useUserStore from "@/store/userStore"; // adjust if TOKEN comes from elsewhere

import { api } from "@/utils/api";

export const useUpdateThumbnail = ({ onDone } = {}) => {
  const updateProfile = useUserStore((state) => state.updateProfile);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["update thumbnail collection"],
    mutationFn: async ({ file, profile, collectionId }) => {
      const formData = new FormData();
      if (file instanceof File) {
        formData.append("image", file);
      }

      const response = await api.patch(
        profile
          ? "/user/profile/image"
          : "/collection/updateTumbnail/" + collectionId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      if (variables.profile) {
        updateProfile(data.profile);
      } else {
        queryClient.invalidateQueries({ queryKey: ["collections"] });
      }
      router.refresh();
      onDone?.();
    },
  });
};
