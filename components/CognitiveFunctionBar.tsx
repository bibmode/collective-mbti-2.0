import React, { useEffect, useLayoutEffect, useState } from "react";
import { setInterval } from "timers/promises";

type Props = {
  name: string;
  value: number;
  color: number;
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

const CognitiveFunctionBar = ({ name, value, color }: Props) => {
  const finalHeight = value;
  const [height, setHeight] = useState<number>(0);
  const [numberValue, setNumberValue] = useState<number>(0);

  useEffect(() => {
    window.setTimeout(() => {
      if (height < finalHeight) {
        setHeight(height + 1);
        setNumberValue(numberValue + 1);
      } else return;
    }, 20);
  }, [height]);

  useEffect(() => {
    window.setTimeout(() => setHeight(height + 1), 20);
  }, []);

  return (
    <div className="flex flex-col items-center w-[24px]">
      <p className="font-semibold text-[11px] text-gray-600">{numberValue}%</p>

      <div className="relative w-3 h-36 rounded-lg bg-gray-100 my-2">
        <div
          className={`absolute bottom-0 w-3 rounded-lg`}
          style={{ height: `${height}%`, backgroundColor: colors[color] }}
        />
      </div>

      <p className="font-semibold text-sm text-gray-600">{name}</p>
    </div>
  );
};

export default CognitiveFunctionBar;
