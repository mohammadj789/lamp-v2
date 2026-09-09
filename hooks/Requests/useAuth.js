import useUserStore from "@/store/userStore";
import { api } from "@/utils/api";
import { setLoginCookie } from "@/utils/loginCookie";
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
      setLoginCookie(data.data.token);
      login(data.data.user);
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
      setLoginCookie(data.data.token);
      login(data.data.user);
      router.push("/app");
    },
  });
};
