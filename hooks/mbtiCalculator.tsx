type ChoicesProps = {
  [key: string]: number;
};

type FourLetters = {
  Extroverted: number;
  Introverted: number;
  Sensor: number;
  Intuitive: number;
  Feeling: number;
  Thinking: number;
  Judging: number;
  Perceiving: number;
};

type CognitiveFunctions = {
  Ne: number;
  Ni: number;
  Se: number;
  Si: number;
  Te: number;
  Ti: number;
  Fe: number;
  Fi: number;
};

class Calculator {
  choices: string[];
  multiplier: number;
  fourLetters: ChoicesProps;
  cognitiveFunctions: ChoicesProps;

  constructor(choices: string[]) {
    this.choices = choices;
    this.multiplier = choices.length / 64;
    this.fourLetters = this.getFourLetters();
    this.cognitiveFunctions = this.getCognitiveFunctions();
  }

  extractFunction = (cognitiveFunctionName: string) => {
    const foundItems: number = this.choices.filter(
      (item) => item === cognitiveFunctionName
    ).length;

    const value: number = Math.round(
      (foundItems / (16 * this.multiplier)) * 100
    );

    return value;
  };

  extractLetter = (letter: string, dividend: number) => {
    let foundItems: number = 0;

    if (letter !== "J" && letter !== "P") {
      foundItems =
        this.choices.filter((item) => item.includes(letter)).length /
        this.multiplier;
    } else if (letter === "J") {
      foundItems =
        this.choices.filter((item) => item.includes("T") || item.includes("F"))
          .length / this.multiplier;
    } else if (letter === "P") {
      foundItems =
        this.choices.filter((item) => item.includes("N") || item.includes("S"))
          .length / this.multiplier;
    }

    const value: number = Math.round((foundItems / dividend) * 100);

    return value;
  };

  getCognitiveFunctions() {
    const data = {
      Ne: this.extractFunction("Ne"),
      Ni: this.extractFunction("Ni"),
      Se: this.extractFunction("Se"),
      Si: this.extractFunction("Si"),
      Te: this.extractFunction("Te"),
      Ti: this.extractFunction("Ti"),
      Fe: this.extractFunction("Fe"),
      Fi: this.extractFunction("Fi"),
    };

    return data;
  }

  getFourLetters() {
    const data = {
      Extroverted: this.extractLetter("e", 64),
      Introverted: this.extractLetter("i", 64),
      Sensor: this.extractLetter("S", 32),
      Intuitive: this.extractLetter("N", 32),
      Feeling: this.extractLetter("F", 32),
      Thinking: this.extractLetter("T", 32),
      Judging: this.extractLetter("J", 64),
      Perceiving: this.extractLetter("P", 64),
    };

    return data;
  }

  sortFuctions() {
    // sort all functions
    let sortedFunctions: any[][] = [];

    for (var cognitiveFunction in this.cognitiveFunctions) {
      sortedFunctions.push([
        cognitiveFunction,
        this.cognitiveFunctions[cognitiveFunction],
      ]);
    }

    sortedFunctions.sort(function (a, b) {
      return b[1] - a[1];
    });

    return sortedFunctions;
  }

  getGreatestFunction(functionArr: any[][]) {
    return functionArr[0][0];
  }

  getFourthLetter(dominantFunction: string) {
    if (
      dominantFunction === "Fi" ||
      dominantFunction === "Ti" ||
      dominantFunction === "Ne" ||
      dominantFunction === "Se"
    )
      return "P";

    return "J";
  }

  getSecondLetter(firstLetter: string) {
    const func1 = `N${firstLetter.toLowerCase()}`;
    const func2 = `S${firstLetter.toLowerCase()}`;

    if (this.cognitiveFunctions[func1] === this.cognitiveFunctions[func2]) {
      return this.fourLetters.Intuitive > this.fourLetters.Intuitive
        ? "N"
        : "S";
    }

    if (this.cognitiveFunctions[func1] > this.cognitiveFunctions[func2]) {
      return "N";
    }

    return "S";
  }

  getThirdLetter(firstLetter: string) {
    const func1 = `T${firstLetter.toLowerCase()}`;
    const func2 = `F${firstLetter.toLowerCase()}`;

    if (this.cognitiveFunctions[func1] === this.cognitiveFunctions[func2]) {
      return this.fourLetters.Thinking > this.fourLetters.Feeling ? "T" : "F";
    }

    if (this.cognitiveFunctions[func1] > this.cognitiveFunctions[func2]) {
      return "T";
    }

    return "F";
  }

  evaluateFunctions(dominantFunction: string) {
    let firstLetter: string = "";
    let secondLetter: string = "";
    let thirdLetter: string = "";
    const fourthFunction: string = this.getFourthLetter(dominantFunction);

    dominantFunction.includes("i") ? (firstLetter = "I") : (firstLetter = "E");

    if (dominantFunction.includes("F") || dominantFunction.includes("T")) {
      secondLetter = this.getSecondLetter(firstLetter);
      thirdLetter = dominantFunction[0];
    } else {
      secondLetter = dominantFunction[0];
      thirdLetter = this.getThirdLetter(firstLetter);
    }

    return firstLetter + secondLetter + thirdLetter + fourthFunction;
  }

  getMBTIType() {
    const sortedAnswers = this.sortFuctions();
    const domFunction = this.getGreatestFunction(sortedAnswers);
    const mbti = this.evaluateFunctions(domFunction);

    return mbti;
  }
}

const mbtiCalculator = (userChoices: string[]) => {
  const userAnswer: Calculator = new Calculator(userChoices);

  // results
  const mbti: string = userAnswer.getMBTIType();
  const fourLetters: FourLetters = userAnswer.getFourLetters();
  const cognitiveFunctions: any[][] = userAnswer.sortFuctions();

  const cognitiveFunctionsUnsorted: CognitiveFunctions =
    userAnswer.getCognitiveFunctions();

  return { mbti, fourLetters, cognitiveFunctions, cognitiveFunctionsUnsorted };
};

export default mbtiCalculator;
