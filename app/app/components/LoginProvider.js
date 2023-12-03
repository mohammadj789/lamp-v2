"use client";
import { useStore } from "@/store/useStore";
import useUserStore from "@/store/userStore";

import { useRouter } from "next/navigation";

const LoginProvider = ({ children }) => {
  const router = useRouter();
  const login = useStore(useUserStore, (state) => state.token);
  if (!login) {
    router.push("/auth");
  } else return children;
};

export default LoginProvider;
