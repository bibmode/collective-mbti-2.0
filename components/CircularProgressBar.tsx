import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { setInterval } from "timers/promises";

type Props = {
  color: string;
  finalValue: number;
};

const CircularProgressBar = ({ color, finalValue }: Props) => {
  const [progress, setProgress] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    window.setTimeout(() => {
      if (value < finalValue) setValue(value + 1);
      else return;
    }, 10);
  }, [value]);

  useEffect(() => {
    window.setTimeout(() => setProgress(finalValue), 300);
    setValue(value + 1);
  }, []);

  return (
    <div>
      <CircularProgressbar
        value={progress}
        strokeWidth={15}
        styles={buildStyles({
          pathColor: color,
          trailColor: "#f3f3f3",
          pathTransitionDuration: 1,
        })}
      />

      <div className="absolute flex items-center justify-center top-0 h-full w-full">
        <h3 className="font-bold text-md" style={{ color }}>
          {value}%
        </h3>
      </div>
    </div>
  );
};

export default CircularProgressBar;
