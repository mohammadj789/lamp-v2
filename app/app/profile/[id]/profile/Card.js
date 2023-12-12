import { DOMAIN } from "@/utils/constant";
import { fetchCollections } from "@/utils/fetchCollections";
import Link from "next/link";
import React from "react";
import { CollectionPlay } from "./CollectionPlay";

const Card = async ({ item, withoutBtn, type }) => {
  return (
    <Link
      href={"/app/" + type + "/" + item._id}
      className="z-0 font-normal flex-shrink-0 h-full  gap-1 rounded-md flex flex-col items-start justify-start hover:bg-white/30 overflow-hidden text-white p-1  group"
    >
      <div className="aspect-square flex-shrink-0 grid place-content-center relative">
        <img
          alt="card thumbnail"
          className="object-cover rounded-md w-full h-full"
          src={item.image ? DOMAIN + item.image : "/girl.jpg"}
        />
        {!withoutBtn && <CollectionPlay id={item._id} />}
      </div>
      <p className="line-clamp-1 font-semibold text-base sm:text-sm flex-shrink-0 ">
        {item.title}
      </p>
      {item?.owner?.owner_name && (
        <p className="line-clamp-2 text-gray-400 text-sm sm:text-xs flex-shrink-0 sm:line-clamp-1 ">
          {item.owner.owner_name}
        </p>
      )}
    </Link>
  );
};

export default Card;
