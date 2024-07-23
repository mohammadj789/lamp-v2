"use client";
import useLampStore from "@/store/store";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import React from "react";

export const InventoryItem = (props) => {
  const track_collection = useLampStore(
    (state) => state.track.collection
  );

  const isPlaying = track_collection === props.id;

  const selectedStyle = "rounded-md bg-gray-800 text-gray-100";
  const unselectedStyle =
    "transition-colors duration-300 transform rounded-md text-gray-200 hover:bg-gray-800 hover:text-gray-200";
  return (
    <Link
      className={`flex items-center ${
        !props.hide ? "lg:justify-center" : ""
      }  px-4 py-2 ${
        props.selected ? selectedStyle : unselectedStyle
      }`}
      href={
        props?.type?.toLowerCase() === "favorite"
          ? "/app/favorites"
          : props?.type?.toLowerCase() === "artist"
          ? `/app/artist/${props.id}`
          : `/app/collection/${props.id}`
      }
    >
      <img
        className={`w-12 h-12 object-cover flex-shrink-0 ${
          props?.type?.toLowerCase() === "artist"
            ? "rounded-full"
            : "rounded-md"
        }`}
        src={props.image ?? "/montain.jpg"}
        alt="inventory item"
      />
      <div
        className={`mx-4 ${
          !props.hide ? "lg:hidden" : ""
        } flex flex-col `}
      >
        <p
          className={`whitespace-nowrap font-[500] ${
            isPlaying && " text-green-600"
          }`}
        >
          {props.title}
        </p>
        <p className="whitespace-nowrap text-sm text-gray-400">
          {props.type}
          {props.credit && ` . ${props.credit}`}
        </p>
      </div>
    </Link>
  );
};
