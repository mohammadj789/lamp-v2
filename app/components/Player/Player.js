import React from "react";
import { Detail } from "./Detail";
import { Controller } from "./Controller";
import { Optioans } from "./Options";

export const Player = () => {
  return (
    <div className="flex h-20 justify-between col-span-full px-3 sm:hidden bg-black  items-center w-full gap-3 text-white p-2 ">
      <Detail />
      <Controller />
      <Optioans />
    </div>
  );
};
