import React from "react";

export const MobileNavItem = (props) => {
  const selectedStyle = " rounded-md text-gray-100";
  const unselectedStyle =
    "transition-colors duration-300 transform text-gray-400";
  return (
    <a
      className={`flex flex-col items-center w-1/3  ${
        props.selected ? selectedStyle : unselectedStyle
      }`}
      href="/#"
    >
      <svg
        className="w-8 h-8"
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
      <p className="text-[.65rem] font-light">{props.title}</p>
    </a>
  );
};
