import { Icon } from "@iconify/react";
import React from "react";

const TypologyBar = () => {
  return (
    <div className="md:flex md:bg-white/90 md:drop-shadow-lg md:px-8 md:py-5 md:rounded-full md:mb-8">
      <h3 className="hidden md:block mr-auto text-gray-500 font-semibold">
        Typology
      </h3>
      <button className="flex ml-auto mr-2 -mt-2 items-center text-gray-500">
        <span className="mr-2">All</span>
        <Icon icon="fa6-solid:filter" />
      </button>
    </div>
  );
};

export default TypologyBar;
