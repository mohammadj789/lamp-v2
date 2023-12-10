import React from "react";
import { LoadingDots } from "./app/components/ui/LoadingDots";

const Loading = () => {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <LoadingDots />
    </div>
  );
};

export default Loading;
