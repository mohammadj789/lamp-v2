import { api } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export const useLogin = () => {
  const login = useUserStore((state) => state.login);
  const router = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (body) => {
      const response = await api.post("/auth/login/", body);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.data.token, data.data.user);
      router.push("/app");
    },
  });
};
export const useRegister = () => {
  const login = useUserStore((state) => state.login);
  const router = useRouter();
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body) => {
      const response = await api.post("/auth/signup/", body);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.data.token, data.data.user);
      router.push("/app");
    },
  });
};
