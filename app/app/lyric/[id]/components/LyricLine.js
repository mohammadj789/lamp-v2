"use client";
import React, { forwardRef } from "react";

export const LyricLine = forwardRef(
  ({ detail, passed, onClick, isCurrent, sync }, ref) => {
    return (
      <button
        disabled={!sync}
        className={`
          ${
            passed &&
            `${
              isCurrent ? "text-neutral-50/100" : "text-neutral-50/75"
            }`
          } ${
          sync ? "hover:text-neutral-50/100" : ""
        }  mb-1 rtl:text-start rtl:font-yekan text-end text-4xl sm:text-3xl rtl:text-3xl sm:rtl:text-2xl font-bold`}
        ref={ref}
        onClick={onClick.bind(null, detail.start)}
      >
        {detail.content}
      </button>
    );
  }
);
