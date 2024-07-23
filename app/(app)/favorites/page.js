"use client";
import React from "react";
import PlayList from "../collection/[id]/PlayList/PlayList";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@/store/userStore";
import { DOMAIN } from "@/utils/constant";
import axios from "axios";
import Loading from "@/app/loading";
import { useFavorites } from "@/hooks/Requests/useFavorites";

const Page = () => {
  const { data, isLoading } = useFavorites();
  if (isLoading || !data) return <Loading />;
  if (data) return <PlayList favorite data={data} />;
};
export default Page;
