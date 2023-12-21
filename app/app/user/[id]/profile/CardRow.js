import React from "react";
import Card from "./Card";

export function CardRow(props) {
  return (
    <div className="w-full mt-4 p-3">
      <div
        className="flex
        justify-between"
      >
        <h2 className="font-bold text-xl text-white mb-1">
          {props.title}
        </h2>
        {props.data.length > 5 && (
          <button className="text-xs text-gray-300 sm:hidden">
            Show More
          </button>
        )}
      </div>
      <div className=" flex flex-nowrap gap-[calc(10%/4)] lg:gap-[calc(10%/3)] md:gap-[calc(10%/2)] sm:gap-[calc(10%/1)] overflow-hidden sm:overflow-auto">
        {props.data.map((item) => (
          <div
            key={item._id}
            className="w-[calc(90%/5)]  lg:w-[calc(90%/4)] md:w-[calc(90%/3)] sm:w-[calc(90%/2)] flex-shrink-0 "
          >
            <Card type={props.type} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
