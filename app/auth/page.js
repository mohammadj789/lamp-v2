"use client";
import { useLogin, useRegister } from "@/hooks/Requests/useAuth";
import React, { useRef, useState } from "react";

function LoginForm({ setLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending, error } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1">
        Email
      </label>

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="text-slate-50 w-full mb-2 border-[1px] border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />

      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1">
        Password
      </label>

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="text-slate-50 w-full mb-2 border-[1px] border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />

      {error && (
        <p className="text-red-600 text-xs mb-2 ml-2">
          {error?.response?.data?.errors?.message}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-green-500 text-xs p-2 rounded-3xl font-bold mb-2"
      >
        {isPending ? "Logging in..." : "Log in"}
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
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { mutate, error, isPending } = useRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData);
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1">
        Name
      </label>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />

      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1">
        Username
      </label>

      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />

      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1">
        Email
      </label>

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />

      <label className="text-slate-50 ml-1 text-xs font-semibold mb-1">
        Password
      </label>

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="text-slate-50 w-full mb-2 border-[1px] text-xs border-neutral-700 rounded-sm outline-none px-3 py-2 bg-gray-900 focus:border-slate-50 hover:border-slate-50"
      />

      {error && (
        <p className="text-red-600 text-xs mb-2 ml-2">
          {error?.response?.data?.errors?.message}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-green-500 text-xs p-2 rounded-3xl font-semibold mb-2"
      >
        {isPending ? "Registering..." : "Register"}
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
