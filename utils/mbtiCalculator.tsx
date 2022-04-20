const exampleChoices = [
  "Ti",
  "Ti",
  "Ne",
  "Fi",
  "Fe",
  "Se",
  "Ne",
  "Te",
  "Ni",
  "Ti",
  "Se",
  "Ni",
  "Te",
  "Fi",
  "Se",
  "Fe",
  "Te",
  "Ni",
  "Ni",
  "Ne",
  "Se",
  "Ne",
  "Fe",
  "Si",
  "Ti",
  "Ti",
  "Si",
  "Ti",
  "Te",
  "Se",
  "Ne",
  "Ti",
  "Ne",
  "Fi",
  "Ni",
  "Si",
  "Fi",
  "Te",
  "Fi",
  "Ne",
  "Ne",
  "Se",
  "Ti",
  "Te",
  "Te",
  "Ni",
  "Ne",
  "Fe",
  "Si",
  "Fe",
  "Ne",
  "Te",
  "Si",
  "Fe",
  "Ti",
  "Fi",
  "Se",
  "Se",
  "Ni",
  "Te",
  "Fi",
  "Ne",
  "Fi",
  "Ne",
];

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

class Result {
  choices: string[];
  fourLetters: ChoicesProps;
  cognitiveFunctions: ChoicesProps;

  constructor(choices: string[]) {
    this.choices = choices;
    this.fourLetters = this.getFourLetters();
    this.cognitiveFunctions = this.getCognitiveFunctions();
  }

  extractFunction = (cognitiveFunctionName: string) => {
    const foundItems: number = this.choices.filter(
      (item) => item === cognitiveFunctionName
    ).length;

    const value: number = Math.round((foundItems / 16) * 100);

    return value;
  };

  extractLetter = (letter: string, dividend: number) => {
    let foundItems: number = 0;

    if (letter !== "J" && letter !== "P") {
      foundItems = this.choices.filter((item) => item.includes(letter)).length;
    } else if (letter === "J") {
      foundItems = this.choices.filter(
        (item) => item.includes("T") || item.includes("F")
      ).length;
    } else if (letter === "P") {
      foundItems = this.choices.filter(
        (item) => item.includes("N") || item.includes("S")
      ).length;
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

  firstLetter() {
    if (this.fourLetters.Extroverted === this.fourLetters.Introverted) {
      // sort all functions
      let sortedEI: any[][] = [];

      for (var cognitiveFunction in this.cognitiveFunctions) {
        sortedEI.push([
          cognitiveFunction,
          this.cognitiveFunctions[cognitiveFunction],
        ]);
      }

      sortedEI.sort(function (a, b) {
        return b[1] - a[1];
      });

      // get index 0 in the sorted array
      const dominantFunction: string = sortedEI[0][0];

      // return letter based on dominant function
      if (dominantFunction.includes("e")) return "E";
      return "I";
    }

    if (this.fourLetters.Extroverted > this.fourLetters.Introverted) {
      return "E";
    }

    return "I";
  }

  secondLetter() {
    if (this.fourLetters.Sensor === this.fourLetters.Intuitive) {
      let sortedSN: any[][] = [];

      // get the sensing and intuitive functions

      for (var cognitiveFunction in this.cognitiveFunctions) {
        sortedSN.push([
          cognitiveFunction,
          this.cognitiveFunctions[cognitiveFunction],
        ]);
      }

      sortedSN.filter((item) => item.includes("N") || item.includes("S"));

      sortedSN.sort(function (a, b) {
        return b[1] - a[1];
      });

      // get index 0 in the sorted array
      const dominantFunction: string = sortedSN[0][0];

      // return letter based on dominant function
      if (dominantFunction.includes("S")) return "S";
      return "N";
    }

    if (this.fourLetters.Sensor > this.fourLetters.Intuitive) {
      return "S";
    }

    return "N";
  }

  thirdLetter() {
    if (this.fourLetters.Feeling === this.fourLetters.Thinking) {
      let sortedFT: any[][] = [];

      // get the sensing and intuitive functions

      for (var cognitiveFunction in this.cognitiveFunctions) {
        sortedFT.push([
          cognitiveFunction,
          this.cognitiveFunctions[cognitiveFunction],
        ]);
      }

      sortedFT.filter((item) => item.includes("F") || item.includes("T"));

      sortedFT.sort(function (a, b) {
        return b[1] - a[1];
      });

      // get index 0 in the sorted array
      const dominantFunction: string = sortedFT[0][0];

      // return letter based on dominant function
      if (dominantFunction.includes("F")) return "F";
      return "T";
    }

    if (this.fourLetters.Feeling > this.fourLetters.Thinking) {
      return "F";
    }

    return "T";
  }

  fourthLetter() {
    if (this.fourLetters.Judging === this.fourLetters.Perceiving) {
      let sortedJP: any[][] = [];

      for (var cognitiveFunction in this.cognitiveFunctions) {
        sortedJP.push([
          cognitiveFunction,
          this.cognitiveFunctions[cognitiveFunction],
        ]);
      }

      sortedJP.sort(function (a, b) {
        return b[1] - a[1];
      });

      // get index 0 in the sorted array
      const dominantFunction: string = sortedJP[0][0];

      // return letter based on dominant function
      if (dominantFunction.includes("F") || dominantFunction.includes("T"))
        return "J";
      return "P";
    }

    if (this.fourLetters.Judging > this.fourLetters.Perceiving) {
      return "J";
    }

    return "P";
  }

  getMBTI() {
    const mbtiType: string =
      this.firstLetter() +
      this.secondLetter() +
      this.thirdLetter() +
      this.fourthLetter();

    return mbtiType;
  }

  getCognitiveFunctionsArray() {
    // sorted in array
    let sortedCognitiveFunction: any[][] = [];

    for (var cognitiveFunction in this.cognitiveFunctions) {
      sortedCognitiveFunction.push([
        cognitiveFunction,
        this.cognitiveFunctions[cognitiveFunction],
      ]);
    }

    sortedCognitiveFunction.sort(function (a, b) {
      return b[1] - a[1];
    });

    return sortedCognitiveFunction;
  }
}

const mbtiCalculator = (userChoices: string[]) => {
  // change this example choices with actual data from user
  const choices: Result = new Result(userChoices);

  const mbti: string = choices.getMBTI();
  const fourLetters: FourLetters = choices.getFourLetters();
  const cognitiveFunctions: any[][] = choices.getCognitiveFunctionsArray();

  const results = {
    mbti,
    fourLetters,
    cognitiveFunctions,
  };

  return results;
};

export default mbtiCalculator;
