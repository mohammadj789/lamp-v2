"use client";
import useUserStore from "@/store/userStore";
import { DOMAIN } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const LoginRequest = async (url, body) => {
  const response = await axios.post(url, body);
  return response.data;
};
function LoginForm({ setLogin }) {
  const login = useUserStore((state) => state.login);
  const email = useRef();
  const password = useRef();
  const router = useRouter();
  const { mutate, data, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: () =>
      LoginRequest(DOMAIN + "/auth/login/", {
        email: email.current.value,
        password: password.current.value,
      }),
    onSuccess: (data) => {
      login(data.data.token, data.data.user);
      router.push("/app");
    },
  });

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1 ">
        Email
      </label>
      <input
        ref={email}
        placeholder="Email"
        className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />
      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1">
        Password
      </label>
      <input
        ref={password}
        placeholder="Password"
        className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />
      {error && (
        <p className="text-red-600 text-xs mb-2 ml-2">
          {error?.response?.data?.errors?.message}
        </p>
      )}
      <button className="w-full bg-green-500 text-xs p-2 rounded-3xl font-bold mb-2">
        Log in
      </button>

      <button
        onClick={() => setLogin(false)}
        type="button"
        className="text-white text-[.5rem]"
      >
        dont have an account?
      </button>
    </form>
  );
}
function RegisterForm({ setLogin }) {
  const name = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const router = useRouter();
  const login = useUserStore((state) => state.login);
  const { mutate, error } = useMutation({
    mutationKey: ["signup"],
    mutationFn: () =>
      LoginRequest(DOMAIN + "/auth/signup/", {
        name: name.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }),
    onSuccess: (data) => {
      login(data.data.token, data.data.user);
      router.push("/app");
    },
  });

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1">
        Name
      </label>
      <input
        ref={name}
        placeholder="Name"
        className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />
      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1">
        Username
      </label>
      <input
        ref={username}
        placeholder="Username"
        className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />
      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1 ">
        Email
      </label>
      <input
        ref={email}
        placeholder="Email"
        className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />
      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1">
        Password
      </label>
      <input
        ref={password}
        placeholder="Password"
        className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />{" "}
      {error && (
        <p className="text-red-600 text-xs mb-2 ml-2">
          {error?.response?.data?.errors?.message}
        </p>
      )}
      <button className="w-full bg-green-500 text-xs p-2 rounded-3xl font-semibold mb-2">
        Register
      </button>
      <button
        onClick={() => setLogin(true)}
        type="button"
        className="text-white text-[.5rem]"
      >
        have an account?
      </button>
    </form>
  );
}

const Page = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="flex items-center justify-center w-screen h-screen  bg-gray-900">
      <div className="bg-gray-950 sm:h-full sm:w-full w-[50vw] p-7 rounded-md flex items-center justify-center sm:max-w-full max-w-md">
        {login ? (
          <LoginForm setLogin={setLogin} />
        ) : (
          <RegisterForm setLogin={setLogin} />
        )}
      </div>
    </div>
  );
};

export default Page;
