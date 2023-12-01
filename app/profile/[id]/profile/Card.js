import { PlaySVG } from "@/svg/Play";
import { DOMAIN } from "@/utils/constant";
import React from "react";

const Card = ({ item }) => {
  return (
    <div className="font-normal flex-shrink-0 h-full  gap-1 rounded-md flex flex-col items-start justify-start hover:bg-white/30 overflow-hidden text-white p-1  group">
      <div className="aspect-square flex-shrink-0 grid place-content-center relative">
        <img
          alt="card thumbnail"
          className="object-cover rounded-md w-full h-full"
          src={item.image ? DOMAIN + item.image : "/girl.jpg"}
        />
        <button className="absolute p-2 bottom-1 opacity-0 transition-all translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 right-1 grid place-content-center rounded-full w-1/4 aspect-square bg-green-500 text-black">
          <PlaySVG />
        </button>
      </div>
      <p className="line-clamp-1 font-semibold text-base sm:text-sm flex-shrink-0 ">
        {item.title}
      </p>
      <p className="line-clamp-2 text-gray-400 text-sm sm:text-xs flex-shrink-0 sm:line-clamp-1 ">
        {item.owner.owner_name}
      </p>
    </div>
  );
};

export default Card;
