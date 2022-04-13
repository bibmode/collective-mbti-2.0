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
};

const Typology = ({ results, avatar }: Props) => {
  return (
    <div className="flex items-center drop-shadow-xl top-0 border-2 border-white rounded-3xl bg-white/70 backdrop-blur-[63px] py-12 px-9">
      {/* user details */}
      <div className="border-r-2 border-gray-100/75">
        <div className="flex items-center">
          <Image
            src={avatar}
            alt="person wearing glasses"
            width={50}
            height={50}
          />
          <div className="leading-tight ml-2">
            <h4 className="text-md text-gray-700 font-semibold">Selena</h4>
            <h5 className="text-sm text-gray-400 font-medium">Friend</h5>
          </div>
        </div>

        {/* mbti */}
        <h2 className="font-bold text-gray-700 text-3xl text-center py-16 px-24">
          INTP
        </h2>

        {/* bottom details */}
        <p className="text-center text-gray-500 mb-2">dza dzaug hahahhahha</p>
        <p className="text-center text-gray-400">2/17/2022 at 3:22 PM</p>
      </div>

      {/* sample result */}
      <div className="pl-10">
        <div className="text-sm">
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
          <div key={index} className="flex items-center text-gray-500">
            <p className="w-[30px]">{result.cognitiveFunc}</p>
            <div className="ml-1 mr-4 h-[10px] w-[200px] bg-gray-200/70 rounded-lg">
              <div
                className={`h-[10px]  rounded-lg`}
                style={{
                  width: `${result.level}%`,
                  backgroundColor: result.color,
                }}
              />
            </div>
            <p>{result.level}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Typology;
