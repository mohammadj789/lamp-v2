"use client";
import React, { forwardRef } from "react";

export const SyncLyricLine = ({
  detail,
  passed,
  onClick,
  isCurrent,
  changeSync,
  index,
}) => {
  return (
    <div className="w-full flex justify-between">
      <button
        disabled={detail.start === 0}
        className={`
          ${
            passed &&
            `${
              isCurrent
                ? "!text-neutral-50/100"
                : "!text-neutral-50/75"
            }`
          } text-neutral-50/75 mb-1 rtl:text-start rtl:font-yekan text-end text-4xl sm:text-3xl rtl:text-3xl sm:rtl:text-2xl font-bold`}
        onClick={onClick.bind(null, detail.start)}
      >
        {detail.content}
      </button>
      {detail.start === 0 ? (
        <button
          onClick={() => changeSync(index)}
          className="text-white bg-zinc-500 px-2 rounded-sm"
        >
          Now
        </button>
      ) : (
        <div className="text-white flex gap-3 items-center">
          <span> {detail.start}</span>
          <button
            onClick={() => changeSync(index, true)}
            className="text-white bg-red-300 px-2 rounded-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
