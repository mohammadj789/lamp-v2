"use client";

import Loading from "@/app/loading";
import useUserStore from "@/store/userStore";
import { getLoginCookie } from "@/utils/loginCookie";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";

const LoginProvider = ({ children }) => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState(null);

  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const isAuth = useUserStore((state) => state.isAuth);

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

  // Runs only on client, after mount — safe to read the cookie here.
  useEffect(() => {
    setToken(getLoginCookie());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!token) {
      logout();
      return;
    }

    if (!isAuth) {
      mutate();
    }
  }, [mounted, token, isAuth, mutate, logout]);

  // Redirect once we're SURE the user isn't authenticated
  // (mounted, no pending check, no in-flight error state to still resolve).
  useEffect(() => {
    if (!mounted) return;
    if (isPending) return;

    const stillChecking = token && !isAuth && !isError;
    if (stillChecking) return;

    if (!isAuth) {
      router.replace("/auth");
    }
  }, [mounted, isPending, token, isAuth, isError, router]);

  /*
   * Before mount, and while checking the token / user session,
   * don't render the protected application.
   */
  if (!mounted || isPending || (token && !isAuth && !isError)) {
    return (
      <div className="w-screen h-screen grid place-content-center">
        <Loading />
      </div>
    );
  }

  /*
   * If the user isn't authenticated,
   * don't render protected content
   * (redirect is already in flight from the effect above).
   */
  if (!isAuth) {
    return null;
  }

  return children;
};

export default LoginProvider;
