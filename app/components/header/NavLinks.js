import React from "react";

export const NavLinks = (props) => {
  const selectedStyle = " rounded-md bg-gray-800 text-gray-100";
  const unselectedStyle =
    "transition-colors duration-300 transform rounded-md text-gray-400 hover:bg-gray-800 hover:text-gray-200";
  return (
    <a
      className={`flex items-center lg:justify-center px-4 py-2 ${
        props.selected ? selectedStyle : unselectedStyle
      }`}
      href="/#"
    >
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={props.svgPath}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="mx-4 font-bold lin lg:hidden">
        {props.title}
      </span>
    </a>
  );
};
