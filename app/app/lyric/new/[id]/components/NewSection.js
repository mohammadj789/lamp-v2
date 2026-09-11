"use client";
import { usePostLyric } from "@/hooks/Requests/usePostLyric";

import React, { useRef, useState } from "react";

const NewSection = ({ data }) => {
  const [line, setLine] = useState([]);
  const [LineInput, setLineinput] = useState("");
  const { mutate } = usePostLyric();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          LineInput.length > 1 &&
            setLine((prv) => {
              return [...prv, LineInput];
            });
          setLineinput("");
        }}
        className="flex justify-between gap-10 mb-3"
      >
        <input
          value={LineInput}
          onChange={(e) => setLineinput(e.target.value)}
          autoFocus
          placeholder="write a line"
          className="text-green-950  w-full  border-2 text-xs border-green-600 rounded-lg outline-none px-3 py-2 bg-white focus:border-gray-900 hover:border-gray-900"
        />
        <button className="bg-zinc-400 px-4 py-1 rounded-lg">
          Add
        </button>
      </form>
      <div className="flex flex-col ">
        {line.map((item, i) => (
          <div key={i} className="flex justify-between items-center">
            <p className="text-3xl text-white">{item}</p>
            <button
              onClick={() => {
                setLine((prv) => prv.filter((_, idx) => idx !== i));
              }}
              className="bg-red-500 text-white px-4 py-1 rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full">
        {line.length > 10 && (
          <button
            onClick={() => {
              if (line.length > 10) {
                mutate({ trackId: data.track._id, line });
              }
            }}
            className="bg-green-600 text-white px-4 py-1 rounded-lg mb-3"
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
};

export default NewSection;
