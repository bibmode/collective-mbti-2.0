import { Icon } from "@iconify/react";
import React from "react";

const TypologyBar = () => {
  return (
    <div className="flex items-center justify-end md:bg-white/90 md:drop-shadow-lg md:px-8 md:py-5 md:rounded-full mb-8 text-gray-500">
      <h3 className="hidden md:block mr-auto font-semibold">Typology</h3>
      <div className="">
        <label className="ml-auto mr-1 items-center ">
          <input
            className="peer hidden"
            type="radio"
            name="result-filter"
            id="result-filter-all"
            defaultChecked
          />
          <span className="mr-3 peer-checked:font-semibold peer-checked:text-blue-500 cursor-pointer hover:text-gray-800">
            All
          </span>
        </label>
        <label className="ml-auto mr-1 items-center ">
          <input
            className="peer hidden"
            type="radio"
            name="result-filter"
            id="result-filter-friends"
          />
          <span className="mr-3 peer-checked:font-semibold peer-checked:text-blue-500 cursor-pointer hover:text-gray-800">
            Friends
          </span>
        </label>
        <label className="ml-auto mr-1 items-center ">
          <input
            className="peer hidden"
            type="radio"
            name="result-filter"
            id="result-filter-romantic"
          />
          <span className="mr-3 peer-checked:font-semibold peer-checked:text-blue-500 cursor-pointer hover:text-gray-800">
            Romantic
          </span>
        </label>
        <label className="ml-auto mr-1 items-center ">
          <input
            className="peer hidden"
            type="radio"
            name="result-filter"
            id="result-filter-work"
          />
          <span className="mr-3 peer-checked:font-semibold peer-checked:text-blue-500 cursor-pointer hover:text-gray-800">
            Work
          </span>
        </label>
        <label className="ml-auto mr-1 items-center ">
          <input
            className="peer hidden"
            type="radio"
            name="result-filter"
            id="result-filter-family"
          />
          <span className="mr-3 peer-checked:font-semibold peer-checked:text-blue-500 cursor-pointer hover:text-gray-800">
            Family
          </span>
        </label>
      </div>
      <Icon icon="fluent:filter-12-filled" className="text-xl" />
    </div>
  );
};

export default TypologyBar;
