import React, { useEffect, useLayoutEffect, useState } from "react";
import { setInterval } from "timers/promises";

type Props = {
  name: string;
  value: number;
  color: number;
  type: string;
};

type BarProps = {
  color: number;
  length: number;
  name: string;
};

const colors = [
  "#dc2626",
  "#f97316",
  "#eab308",
  "#059669",
  "#2563eb",
  "#6366f1",
  "#8b5cf6",
  "#f472b6",
];

const VerticalBar = ({ color, length, name }: BarProps) => {
  return (
    <div className="flex flex-col items-center w-[24px]">
      <p className="font-semibold text-[11px] text-gray-600">{length}%</p>

      <div className="relative w-3 h-36 rounded-lg bg-gray-100 my-2">
        <div
          className={`absolute bottom-0 w-3 rounded-lg`}
          style={{ height: `${length}%`, backgroundColor: colors[color] }}
        />
      </div>

      <p className="font-semibold text-sm text-gray-600">{name}</p>
    </div>
  );
};

const HorizontalBar = ({ color, length, name }: BarProps) => {
  return (
    <>
      <p className="w-[30px]">{name}</p>
      <div className="self-center mx-4 h-[8px] w-full bg-gray-200/70 rounded-lg">
        <div
          className={`h-[8px]  rounded-lg`}
          style={{
            width: `${length}%`,
            backgroundColor: colors[color],
          }}
        />
      </div>
      <p className="w-11">{length}%</p>
    </>
  );
};

const CognitiveFunctionBar = ({ name, value, color, type }: Props) => {
  const finalHeight = value;
  const [height, setHeight] = useState<number>(0);
  const [numberValue, setNumberValue] = useState<number>(0);

  useEffect(() => {
    window.setTimeout(() => {
      if (height < finalHeight) {
        setHeight(height + 1);
        setNumberValue(numberValue + 1);
      } else return;
    }, 10);
  }, [height]);

  useEffect(() => {
    window.setTimeout(() => setHeight(height + 1), 10);
  }, []);

  if (type === "vertical")
    return <VerticalBar length={height} color={color} name={name} />;

  return <HorizontalBar length={height} color={color} name={name} />;
};

export default CognitiveFunctionBar;
