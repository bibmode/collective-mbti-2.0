import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { selfQuestions } from "../../data/selftest-questions";
import testShuffle from "../../utils/testShuffle";

type Option = {
  cognitiveFunction: string;
  statement: string;
};

const SelfTest = () => {
  const myRef = useRef<HTMLInputElement>(null);
  const [questionPage, setQuestionPage] = useState<number>(0);
  const [questions, setQuestions] = useState<Option[][][] | null>(null);
  const [answers, setAnswers] = useState<string[] | []>(
    new Array(64).fill(null)
  );
  const [answerColors, setAnswerColors] = useState<number[] | []>(
    new Array(64).fill(null)
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const questionsStart: Option[][][] = testShuffle({
      questionnaire: selfQuestions,
    });
    setQuestions(questionsStart);
  }, []);

  const checkBeforeNavigating = () => {
    const expectedNumberOfAnswers = 8 * (questionPage + 1);
    const answersLen = answers.filter((answer) => answer !== null).length;

    return expectedNumberOfAnswers <= answersLen;
  };

  const scrollToTop = () => {
    if (myRef.current) window.scrollTo(0, myRef.current.offsetTop - 100);
  };

  const checkIfAllItemsAreAnswered = () => {
    const answersLen = answers.filter((answer) => answer === null).length;
    return answersLen !== 0;
  };

  useLayoutEffect(() => {
    scrollToTop();
  }, [questionPage]);

  const handleChoice = (
    answer: string,
    questionIndex: number,
    optionIndex: number
  ) => {
    const positionInArray = questionIndex + 8 * questionPage;

    const newAnswers = answers.map((item, index) => {
      return positionInArray === index ? answer : item;
    });

    const newAnswerColors = answerColors.map((item, index) => {
      return positionInArray === index ? optionIndex : item;
    });

    setAnswers(newAnswers);
    setAnswerColors(newAnswerColors);
  };

  const updateProgress = () => {
    const answeredLength = answers.filter((answer) => answer !== null).length;
    const percentage = Math.round((answeredLength / 64) * 100);
    setProgress(percentage);
  };

  const quizNavigator = (direction: boolean) => {
    if (direction) {
      setQuestionPage(questionPage + 1);
    } else {
      setQuestionPage(questionPage - 1);
    }
  };

  useEffect(() => {
    // progress
    updateProgress();
  }, [answers]);

  const submitAnswers = () => {
    console.log(answers);
  };

  return (
    <div>
      <main className="container flex flex-col items-center max-w-screen-xl text-gray-700 pb-12">
        {/* nav bar */}
        <nav className="flex items-center w-full justify-between py-8 lg:pt-12 md:mb-12">
          <div className="flex items-center">
            <Image src="/logo.svg" alt="logo" width="50" height="50" />
            <h1 className="uppercase font-bold text-[21px] w-28 leading-tight ml-3">
              collective mbti
            </h1>
          </div>

          {/* mobile hamburger button */}
          <label className="text-5xl -mt-3 md:hidden">
            <input
              className="hidden"
              type="checkbox"
              name="hamburger-menu"
              id="hamburger-menu"
            />
            <Icon icon="heroicons-outline:menu-alt-3" />
          </label>

          {/* desktop page title menu */}
          <div className="hidden md:block text-3xl font-semibold">
            <span className="text-blue-600">M</span>
            <span className="text-yellow-400">B</span>
            <span className="text-red-600">T</span>
            <span className="text-green-600 mr-2">I</span>
            TEST
          </div>

          {/* profile button */}
          <div className="hidden md:flex items-center">
            <p className="text-[15px] max-w-[100px] mr-3 text-right leading-tight font-semibold text-gray-700">
              GENEVIEVE NAVALES
            </p>
            <button className="relative border-2 border-gray-800 h-12 w-12 rounded-full overflow-hidden">
              <Image
                src="https://i.pinimg.com/236x/bf/6a/eb/bf6aeb4b635873217fe411313a4e31f7.jpg"
                alt="user image"
                layout="fill"
                objectFit="cover"
              />
            </button>
          </div>
        </nav>

        {/* guidelines */}
        <div className="bg-white rounded-3xl mt-4 px-6 py-8 drop-shadow-lg max-w-[691px]">
          <h2 className="text-center text-lg mb-2 font-semibold">
            Guidelines for this test
          </h2>
          <ol className="list-decimal text-sm ml-4 text-gray-600">
            <li className="mb-2">
              <p>Choose the sentence that suits you best.</p>
            </li>
            <li className="mb-2">
              <p>
                There is no option for neutral for every item so you have to
                really dug into your record of behavior.
              </p>
            </li>
            <li className="mb-2">
              <p>
                Choose based on your records of past actions and what you would
                normally do.
              </p>
            </li>
            <li>
              <p>
                Be honest.{" "}
                <span className="underline font-semibold">
                  There are no wrong answers
                </span>{" "}
                and no one is judging you here.
              </p>
            </li>
          </ol>
        </div>

        {/* progress bar */}
        <div className="mt-14 flex justify-center bg-white/70 backdrop-blur-sm py-6 mb-8 w-full sticky top-0 z-10">
          <div className="w-full max-w-screen-lg flex items-center ">
            <p className="font-semibold mr-3">{questionPage + 1}/8</p>
            <div className="relative w-full h-4 bg-gray-100 rounded-full mr-3">
              <div
                className="h-4 bg-transparent clip-background rounded-full transition-all ease-in-out duration-300"
                style={{ width: `${progress}%` }}
              >
                <div className="h-4 w-full absolute left-0 top-0 clip-background rounded-full bg-rainbow" />
              </div>
            </div>

            <p className="font-semibold">{progress}%</p>
          </div>
        </div>

        <div ref={myRef}>
          <h1 className="uppercase font-bold text-xl text-center md:my-5">
            which sounds more like you?
          </h1>
        </div>

        {/* questions */}
        {questions
          ? questions[questionPage]?.map((item: Option[], index) => (
              <div
                className="flex flex-col md:flex-row items-center text-center px-6 py-8 mb-4 md:my-4 w-full max-w-screen-lg bg-white drop-shadow-lg rounded-3xl md:py-12"
                key={`question-${questionPage}-${index}`}
              >
                <label className="text-[15px] md:w-6/12 md:pr-8 md:text-lg hover:cursor-pointer">
                  <input
                    type="radio"
                    name={`item-${index}-${questionPage}`}
                    id={`item-${index}-${questionPage}-1`}
                    checked={
                      answerColors[index + 8 * questionPage] === 1
                        ? true
                        : false
                    }
                    className="peer hidden"
                    onChange={() =>
                      handleChoice(item[0].cognitiveFunction, index, 1)
                    }
                  />
                  <span
                    className={`${
                      index === 0 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-red-500"
                        : index === 1 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-orange-500"
                        : index === 2 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-yellow-500"
                        : index === 3 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-green-500"
                        : index === 4 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-blue-500"
                        : index === 5 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-indigo-500"
                        : index === 6 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-violet-500"
                        : index === 7 &&
                          answers[index + 8 * questionPage] &&
                          "peer-checked:text-fuchsia-500"
                    }`}
                  >
                    {item[0].statement}
                  </span>
                </label>

                <div
                  className={`border border-gray-900 w-11  md:w-16 h-11 md:h-16 md:px-1 my-3 md:my-0 uppercase flex items-center justify-center rounded-full ${
                    index === 0 && answers[index + 8 * questionPage]
                      ? "bg-red-500"
                      : index === 1 && answers[index + 8 * questionPage]
                      ? "bg-orange-500"
                      : index === 2 && answers[index + 8 * questionPage]
                      ? "bg-yellow-400"
                      : index === 3 && answers[index + 8 * questionPage]
                      ? "bg-green-500"
                      : index === 4 && answers[index + 8 * questionPage]
                      ? "bg-blue-500"
                      : index === 5 && answers[index + 8 * questionPage]
                      ? "bg-indigo-500"
                      : index === 6 && answers[index + 8 * questionPage]
                      ? "bg-violet-500"
                      : index === 7 &&
                        answers[index + 8 * questionPage] &&
                        "bg-fuchsia-500"
                  } ${
                    answers[index + 8 * questionPage] && "border-0 text-white"
                  }`}
                >
                  <p>or</p>
                </div>

                <label className="text-[15px] md:w-6/12 md:pl-8 md:text-lg hover:cursor-pointer">
                  <input
                    type="radio"
                    name={`item-${index}-${questionPage}`}
                    id={`item-${index}-${questionPage}-2`}
                    checked={
                      answerColors[index + 8 * questionPage] === 2
                        ? true
                        : false
                    }
                    value={item[1].cognitiveFunction}
                    className="peer hidden"
                    onChange={() =>
                      handleChoice(item[1].cognitiveFunction, index, 2)
                    }
                  />
                  <span
                    className={`${
                      index === 0 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-red-500"
                        : index === 1 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-orange-500"
                        : index === 2 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-yellow-500"
                        : index === 3 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-green-500"
                        : index === 4 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-blue-500"
                        : index === 5 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-indigo-500"
                        : index === 6 && answers[index + 8 * questionPage]
                        ? "peer-checked:text-violet-500"
                        : index === 7 &&
                          answers[index + 8 * questionPage] &&
                          "peer-checked:text-fuchsia-500"
                    }`}
                  >
                    {item[1].statement}
                  </span>
                </label>
              </div>
            ))
          : null}

        {/* quiz navigation buttons */}
        <div className="flex my-8">
          <button
            onClick={() => quizNavigator(false)}
            disabled={questionPage === 0 ? true : false}
            className="h-12 w-12 rounded-full bg-gray-800 disabled:bg-gray-200 flex items-center justify-center text-3xl text-white"
          >
            <Icon icon="ic:round-navigate-before" />
          </button>

          {questionPage !== 7 || checkIfAllItemsAreAnswered() ? (
            <button
              onClick={() => quizNavigator(true)}
              disabled={
                questionPage === 7 || !checkBeforeNavigating() ? true : false
              }
              className="h-12 w-12 ml-6 rounded-full bg-gray-800 disabled:bg-gray-200 flex items-center justify-center text-3xl text-white"
            >
              <Icon icon="ic:round-navigate-next" />
            </button>
          ) : (
            <button
              onClick={() => submitAnswers()}
              className="h-12 w-12 ml-6 rounded-full bg-green-500 hover:bg-green-700 flex items-center justify-center text-3xl text-white"
            >
              <Icon icon="bi:check" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default SelfTest;
