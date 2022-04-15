import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { setInterval, setTimeout } from "timers/promises";
import CircularProgressBar from "./CircularProgressBar";
import CognitiveFunctionBar from "./CognitiveFunctionBar";

const letterResult = [
  {
    name: "Extroverted",
    finalValue: 75,
    color: "#2563eb",
  },
  {
    name: "Intuitive",
    finalValue: 57,
    color: "#eab308",
  },
  {
    name: "Thinking",
    finalValue: 53,
    color: "#dc2626",
  },
  {
    name: "Perceiving",
    finalValue: 68,
    color: "#059669",
  },
];

const cognitiveFunctionResult = [
  {
    name: "Ne",
    value: 95,
  },
  {
    name: "Ti",
    value: 76,
  },
  {
    name: "Fe",
    value: 55,
  },
  {
    name: "Se",
    value: 52,
  },
  {
    name: "Te",
    value: 49,
  },
  {
    name: "Fi",
    value: 25,
  },
  {
    name: "Ni",
    value: 15,
  },
  {
    name: "Si",
    value: 5,
  },
];

const Results = () => {
  const [resultOption, setResultOption] = useState(1);

  const optionStyle = (optionValue: number) => {
    if (resultOption === optionValue) return "text-gray-600 bg-blue-50";
  };

  const letterColor = (index: number) => {
    let color: string = "";
    switch (index) {
      case 0:
        color = "text-blue-500";
        break;
      case 1:
        color = "text-yellow-500";
        break;
      case 2:
        color = "text-red-600";
        break;
      case 3:
        color = "text-emerald-600";
        break;
    }

    return color;
  };

  return (
    <div className="flex flex-col md:flex-row-reverse md:justify-between lg:mb-8">
      {/* descriptions */}
      <div className="rounded-2xl bg-white md:bg-white/90 drop-shadow-xl h-fit overflow-hidden md:max-w-xs">
        <nav className="w-full flex text-[9px] text-gray-400 text-center font-semibold">
          <input
            className="hidden"
            type="radio"
            id="result1"
            name="resultOption"
            onChange={() => setResultOption(1)}
            defaultChecked
          />
          <label
            htmlFor="result1"
            className={`uppercase py-4 pl-7 pr-2 grow ${optionStyle(1)}`}
          >
            accumulative result
          </label>

          <input
            className="hidden"
            type="radio"
            id="result2"
            name="resultOption"
            onChange={() => setResultOption(2)}
          />
          <label
            htmlFor="result2"
            className={`border-x border-gray-200 uppercase py-4 px-2 grow ${optionStyle(
              2
            )}`}
          >
            according to friends
          </label>

          <input
            className="hidden"
            type="radio"
            id="result3"
            name="resultOption"
            onChange={() => setResultOption(3)}
          />
          <label
            htmlFor="result3"
            className={`uppercase py-4 pl-2 pr-6 grow ${optionStyle(3)}`}
          >
            self-tested result
          </label>
        </nav>

        <div className="border-t border-gray-200 py-5 px-8">
          <h2 className="text-center text-3xl font-semibold pt-2 pb-5">
            {["e", "n", "t", "p"].map((letter, index) => (
              <span key={index} className={`uppercase ${letterColor(index)}`}>
                {letter}
              </span>
            ))}
          </h2>
          <p className="text-sm text-gray-500">
            ENTPs are frequently described as clever, cerebrally and verbally
            quick, enthusiastic, outgoing, innovative, flexible, and
            resourceful. ENTPs’ minds move at a frenetic pace, contributing to
            restlessness, anxiousness, and erratic sleeping patterns. Not only
            are they constantly scanning for new possibilities, but also
            generating new ideas and associations. Moreover, ENTPs enjoy sharing
            and exchanging their ideas with others. -{" "}
            <a
              className="underline text-gray-600 font-semibold"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              source
            </a>
          </p>

          <ul className="text-sm flex flex-col font-semibold text-gray-600 underline ml-6 my-4 list-disc">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                psychologyjunkie.com
              </a>
            </li>

            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                16personalities.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* graphs */}
      <div className="flex flex-col md:w-full lg:grow lg:justify-center">
        <div className="self-center flex flex-col items-center w-full md:px-8 md:pt-2 xl:w-[680px]">
          <div
            className="py-12 px-6 grid place-items-center gap-y-14 grid-cols-2 grid-rows-2
            md:w-[340px] md:py-0 md:pb-4 gap-x-12
            lg:grid-cols-4 lg:grid-rows-1 lg:w-full lg:pb-12 lg:pt-4
          "
          >
            {letterResult.map((result, index) => (
              <div key={index} className="relative w-24 h-24 lg:w-28 lg:h-28">
                <CircularProgressBar
                  color={result.color}
                  finalValue={result.finalValue}
                />
                <p className="text-center font-medium text-gray-500 pt-2">
                  {result.name}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between py-12 w-full lg:max-w-[500px] lg:self-center">
            {cognitiveFunctionResult.map((result, index) => (
              <CognitiveFunctionBar
                key={index}
                name={result.name}
                value={result.value}
                color={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
