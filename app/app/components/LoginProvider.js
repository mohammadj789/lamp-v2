"use client";
import Loading from "@/app/loading";

import useUserStore from "@/store/userStore";

import { getRequest } from "@/utils/getRequest";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginProvider = ({ children }) => {
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const token = useUserStore((state) => state.token);
  const isAuth = useUserStore((state) => state.isAuth);

  const { mutate, error, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: () =>
      getRequest("/auth/", {
        Authorization: "Bearer " + token,
      }),
    onSuccess: (data) => login(token, data.data.user),
  });
  // useEffect(() => {
  //   if (error?.response?.status === 401);
  //   logout();
  // }, [error]);
  useEffect(() => {
    if (token && !isAuth) {
      mutate();
    }
  }, [token, isAuth, mutate]);

  if (
    isPending ||
    (!isPending && token && !isAuth) ||
    typeof window === "undefined"
  ) {
    return (
      <div className="w-screen h-screen grid place-content-center">
        <Loading />
      </div>
    );
  } else if (!isAuth || error) {
    router.push("/auth");
    logout();
  } else return children;
};

export default LoginProvider;
