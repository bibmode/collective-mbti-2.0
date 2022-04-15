import Image, { StaticImageData } from "next/image";
import React from "react";
type Result = {
  cognitiveFunc: string;
  level: number;
  color: string;
};

type Props = {
  results: Result[];
  avatar: StaticImageData;
  name: string;
  relationship: string;
  mbtiType: string;
  comment: string;
  date: string;
};

const Typology = ({
  results,
  avatar,
  name,
  relationship,
  mbtiType,
  comment,
  date,
}: Props) => {
  return (
    <div className="flex flex-col items-center drop-shadow-xl top-0 border-2 border-white rounded-3xl bg-white backdrop-blur-[63px] py-12 px-6 mb-8 md:px-9 lg:flex-row">
      {/* user details */}
      <div className="border-b-2 pb-2 lg:border-r-2 lg:border-b-0 border-gray-200 w-full">
        <div className="flex items-center">
          <Image
            src={avatar}
            alt="person wearing glasses"
            width={50}
            height={50}
          />
          <div className="leading-tight ml-2">
            <h4 className="text-md text-gray-700 font-semibold">{name}</h4>
            <h5 className="text-sm text-gray-400 font-medium">
              {relationship}
            </h5>
          </div>

          <h2 className="block md:hidden font-semibold text-gray-700 text-3xl text-center ml-auto">
            {mbtiType}
          </h2>
        </div>

        {/* mbti */}
        <h2 className="hidden md:block font-bold text-gray-700 text-3xl text-center py-10 px-24">
          {mbtiType}
        </h2>

        {/* bottom details */}
        <p className="md:text-center text-gray-500 mt-5 md:mb-2">{comment}</p>
        <p className="md:text-center mb-3 text-gray-400">{date}</p>
      </div>

      {/* sample result */}
      <div className="w-full md:pl-10">
        <div className="text-xs text-gray-700 font-semibold flex justify-center pt-3 pb-4">
          <label>
            <input
              type="radio"
              name="result-option-1"
              id="result-option-1"
              className="hidden"
            />
            <span className="uppercase pr-3 border-r border-gray-300">
              cognitive function
            </span>
          </label>
          <label>
            <input
              type="radio"
              name="result-option-1"
              id="result-option-1"
              className="hidden"
            />
            <span className="uppercase pl-3">4 letters</span>
          </label>
        </div>

        {results.map((result, index) => (
          <div
            key={index}
            className="flex justify-between items-center font-semibold text-[14px] text-gray-600"
          >
            <p className="w-[30px]">{result.cognitiveFunc}</p>
            <div className="self-center mx-4 h-[8px] w-full bg-gray-200/70 rounded-lg">
              <div
                className={`h-[8px]  rounded-lg`}
                style={{
                  width: `${result.level}%`,
                  backgroundColor: result.color,
                }}
              />
            </div>
            <p className="w-11">{result.level}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Typology;
