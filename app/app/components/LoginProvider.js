"use client";

import Loading from "@/app/loading";
import useUserStore from "@/store/userStore";
import { getLoginCookie } from "@/utils/loginCookie";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "@/utils/api";

const LoginProvider = ({ children }) => {
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const isAuth = useUserStore((state) => state.isAuth);

  const token = getLoginCookie();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["user"],

    mutationFn: async () => {
      const response = await api.get("/auth/");
      return response.data;
    },

    onSuccess: (data) => {
      login(data.data.user);
    },

    onError: (error) => {
      if (error?.response?.status === 401) {
        logout();
      }
    },
  });

  useEffect(() => {
    if (!token) {
      logout();
      return;
    }

    if (!isAuth) mutate();
  }, [token, isAuth, mutate, logout]);

  if (isPending || (token && !isAuth && !isError)) {
    return (
      <div className="w-screen h-screen grid place-content-center">
        <Loading />
      </div>
    );
  }

  if (!isAuth) {
    return null;
  }

  return children;
};

export default LoginProvider;
