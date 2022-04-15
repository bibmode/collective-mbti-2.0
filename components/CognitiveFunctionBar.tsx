import React, { useEffect } from "react";

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
  const height = (9 / 100) * value;

  useEffect(() => {
    console.log(value);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold text-[11px] text-gray-600">{value}%</p>

      <div className="relative w-3 h-36 rounded-lg bg-gray-100 my-2">
        <div
          className={`absolute bottom-0 w-3 rounded-lg`}
          style={{ height: `${height}rem`, backgroundColor: colors[color] }}
        />
      </div>

      <p className="font-semibold text-sm text-gray-600">{name}</p>
    </div>
  );
};

export default CognitiveFunctionBar;
