const _ = require("lodash");

type Option = {
  cognitiveFunction: string;
  statement: string;
};

type Props = {
  questionnaire: Option[][];
};

const testShuffle = ({ questionnaire }: Props) => {
  const shuffled: [] = _.chunk(_.shuffle(questionnaire), 8);
  return shuffled;
};

export default testShuffle;
