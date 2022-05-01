export type FourLetters = {
  Extroverted: number;
  Feeling: number;
  Introverted: number;
  Intuitive: number;
  Judging: number;
  Perceiving: number;
  Sensor: number;
  Thinking: number;
};

export type CognitiveFunctions = {
  Ne: number;
  Ni: number;
  Se: number;
  Si: number;
  Te: number;
  Ti: number;
  Fe: number;
  Fi: number;
};

export type Results = {
  mbti: string;
  fourLetters: FourLetters;
  cognitiveFunctions: any[][];
  cognitiveFunctionsUnsorted: CognitiveFunctions;
};

export type TypologyResult = {
  name: string;
  relationship: string;
  comment: string | null;
  results: {
    mbti: string;
    fourLetters: FourLetters;
    cognitiveFunctions: any[][];
    cognitiveFunctionsUnsorted: CognitiveFunctions;
  };
};

export type Descriptions = {
  type: string;
  description: string;
  source1: string;
  source2: string;
};
