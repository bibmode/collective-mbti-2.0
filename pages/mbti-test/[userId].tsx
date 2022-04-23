import { Icon } from "@iconify/react";
import Image from "next/image";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import avatar1 from "../../public/avatars/casual-life-3d-avatar-with-man-in-green-shirt-and-orange-hat.png";
import avatar2 from "../../public/avatars/casual-life-3d-avatar-with-person-in-glasses-and-orange-shirt.png";
import avatar3 from "../../public/avatars/casual-life-3d-avatar-with-redhead-woman-on-pink-background.png";
import avatar4 from "../../public/avatars/casual-life-3d-avatar-with-woman-in-black-hat-and-pink-shirt.png";

import { inviteQuestions } from "../../data/invite-questions";
import testShuffle from "../../hooks/testShuffle";
import NavBar from "../../components/NavBar";
import { LayoutContext } from "../../components/context/LayoutContext";

type Option = {
  cognitiveFunction: string;
  statement: string;
};

const InviteTest = () => {
  const { closeProfileMenu } = useContext(LayoutContext);

  const myRef = useRef<HTMLInputElement>(null);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [overlay, setOverlay] = useState<boolean>(true);
  const [questionPage, setQuestionPage] = useState<number>(0);
  const [questions, setQuestions] = useState<Option[][][] | null>(null);
  const [answers, setAnswers] = useState<string[] | []>(
    new Array(64).fill(null)
  );
  const [answerColors, setAnswerColors] = useState<number[] | []>(
    new Array(64).fill(null)
  );
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const questionsStart: Option[][][] = testShuffle({
      questionnaire: inviteQuestions,
    });
    setQuestions(questionsStart);
  }, []);

  const checkBeforeNavigating = () => {
    const expectedNumberOfAnswers = 8 * (questionPage + 1);
    const answersLen = answers.filter((answer) => answer !== null).length;

    return expectedNumberOfAnswers <= answersLen;
  };

  const scrollToTop = () => {
    if (myRef.current && !initialLoad)
      window.scrollTo(0, myRef.current.offsetTop + 390);
  };

  const checkIfAllItemsAreAnswered = () => {
    const answersLen = answers.filter((answer) => answer === null).length;
    return answersLen !== 0;
  };

  useEffect(() => {
    scrollToTop();
    setInitialLoad(false);
  }, [questionPage]);

  const moveDown = () => {
    window.scrollBy(0, 200);
  };

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
    moveDown();
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

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== "") setOverlay(false);
    else setOverlay(true);
  };

  return (
    <div onClick={closeProfileMenu}>
      <main className="container flex flex-col items-center max-w-screen-xl text-gray-700 pb-12">
        {/* nav bar */}
        <NavBar
          image="https://i.pinimg.com/236x/bf/6a/eb/bf6aeb4b635873217fe411313a4e31f7.jpg"
          navType={false}
        />

        {/* form fill up */}
        <div className="flex flex-col md:flex-row max-w-screen-lg w-full text-gray-600">
          {/* form details */}
          <div className="bg-white rounded-3xl my-4 px-6 md:px-8 py-8 drop-shadow-lg w-full grow md:my-0 md:mr-4">
            <p className="text-sm mb-4">
              Genevieve invited you to test them for their MBTI type. Please
              fill up your details to proceed:
            </p>

            {/* name */}
            <input
              type="text"
              className="w-full py-3 px-4 border border-gray-400 rounded-full"
              placeholder="Name"
              onChange={(e) => handleNameInput(e)}
            />

            {/* relationship */}
            <div className="mt-4 flex items-center justify-between flex-wrap">
              <label htmlFor="relationship">
                <p className="w-36 my-2">Your relationship?</p>
              </label>

              <div className="relative w-fit">
                <select className="block bg-gray-800 text-white pl-4 pr-8 py-2 ml-auto rounded-full appearance-none focus:outline-none focus:shadow-outline">
                  <option value="friend">Friend</option>
                  <option value="romantic">Romantic</option>
                  <option value="family">Family</option>
                  <option value="business">Business</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-white">
                  <Icon icon="ant-design:caret-down-filled" />
                </div>
              </div>
            </div>

            {/* avatar */}
            <div className="mt-4 md:mt-2">
              <p>Choose an avatar:</p>

              <div className="flex justify-center mt-2 flex-wrap">
                {/* available avatars */}
                <div
                  key="avatar-0"
                  className="w-12 h-12 overflow-hidden rounded-full relative ml-3"
                >
                  <input
                    type="radio"
                    id="contactChoice-0"
                    name="avatarChoice"
                    value="email"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="contactChoice-0"
                    className="peer-checked:border-4 border-blue-700 w-full h-full absolute rounded-full cursor-pointer overflow-hidden"
                  >
                    <Image
                      src="https://i.pinimg.com/236x/bf/6a/eb/bf6aeb4b635873217fe411313a4e31f7.jpg"
                      alt="user image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </label>
                </div>
                <div
                  key="avatar-1"
                  className="w-12 h-12 overflow-none rounded-full relative ml-3"
                >
                  <input
                    type="radio"
                    id="contactChoice-1"
                    name="avatarChoice"
                    value="email"
                    className="peer hidden"
                    defaultChecked
                  />
                  <label
                    htmlFor="contactChoice-1"
                    className="peer-checked:border-4 border-blue-700 w-full h-full absolute rounded-full cursor-pointer"
                  >
                    <Image
                      src={avatar1}
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                    />
                  </label>
                </div>

                <div
                  key="avatar-2"
                  className="w-12 h-12 overflow-none rounded-full relative ml-3"
                >
                  <input
                    type="radio"
                    id="contactChoice-2"
                    name="avatarChoice"
                    value="email"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="contactChoice-2"
                    className="peer-checked:border-4 border-blue-700 w-full h-full absolute rounded-full cursor-pointer"
                  >
                    <Image
                      src={avatar2}
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                    />
                  </label>
                </div>

                <div
                  key="avatar-3"
                  className="w-12 h-12 overflow-none rounded-full relative ml-3"
                >
                  <input
                    type="radio"
                    id="contactChoice-3"
                    name="avatarChoice"
                    value="email"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="contactChoice-3"
                    className="peer-checked:border-4 border-blue-700 w-full h-full absolute rounded-full cursor-pointer"
                  >
                    <Image
                      src={avatar3}
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                    />
                  </label>
                </div>

                <div
                  key="avatar-4"
                  className="w-12 h-12 overflow-none rounded-full relative ml-3"
                >
                  <input
                    type="radio"
                    id="contactChoice-4"
                    name="avatarChoice"
                    value="email"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="contactChoice-4"
                    className="peer-checked:border-4 border-blue-700 w-full h-full absolute rounded-full cursor-pointer"
                  >
                    <Image
                      src={avatar4}
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* guidelines */}
          <div className="bg-white rounded-3xl mt-4 px-6 py-8 md:px-8 md:mt-0 drop-shadow-lg w-full md:ml-4">
            <h2 className="text-center text-lg mb-2 font-semibold">
              Guidelines for this test
            </h2>
            <ol className="list-decimal text-sm ml-4 text-gray-600 lg:mt-6">
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
                  Choose based on your records of past actions and what you
                  would normally do.
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
        </div>

        <div className="relative flex flex-col items-center h-fit w-full">
          {/* overlay */}
          {overlay && (
            <div className="w-[110%] backdrop-blur-sm bg-gradient-to-b bg-white/60 absolute top-14 h-full z-30 ">
              <h2 className="text-gray-500 py-16 text-lg font-semibold flex items-center justify-center">
                Please fill up your details to proceed
                <span className="ml-2">
                  <Icon icon="akar-icons:arrow-down" />
                </span>
              </h2>
            </div>
          )}

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
              which sounds more like Genevieve?
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
                      }  py-8`}
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
                      } py-8`}
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
        </div>
      </main>
    </div>
  );
};

export default InviteTest;
