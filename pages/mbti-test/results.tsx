import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../components/context/LayoutContext";
import NavBar from "../../components/NavBar";
import Results from "../../components/Results";
import Traits from "../../components/Traits";
import Typology from "../../components/Typology";
import TypologyBar from "../../components/TypologyBar";
import avatar from "../../public/avatars/casual-life-3d-avatar-with-redhead-woman-on-pink-background.png";

const positiveTraits = [
  {
    trait: "Bold",
    description:
      " One of the ENTP’s greatest strengths and keys to success is his or her boldness in the face of challenge.",
  },
  {
    trait: "Adaptable",
    description:
      "ENTPs are generally go-with-the-flow people. They deal well with fast-paced and frequent change and enjoy the corresponding challenges.",
  },
  {
    trait: "Innovative",
    description:
      "In all things—products, procedures and systems—ENTPs know there is always a better way and with the right kind of thinking, they will get there.",
  },
  {
    trait: "Confident",
    description:
      "Generally speaking, criticism and ostracism have very little effect on ENTPs. ",
  },
];

const sampleResultCognitive = [
  {
    cognitiveFunc: "Ne",
    level: 85,
    color: "#ef4444",
  },
  {
    cognitiveFunc: "Ti",
    level: 70,
    color: "#f97316",
  },
  {
    cognitiveFunc: "Fe",
    level: 50,
    color: "#facc15",
  },
  {
    cognitiveFunc: "Si",
    level: 30,
    color: "#10b981",
  },
  {
    cognitiveFunc: "Ne",
    level: 25,
    color: "#3b82f6",
  },
  {
    cognitiveFunc: "Ti",
    level: 25,
    color: "#6366f1",
  },
  {
    cognitiveFunc: "Fe",
    level: 10,
    color: "#a855f7",
  },
  {
    cognitiveFunc: "Si",
    level: 5,
    color: "#f472b6",
  },
];

const sampleResultLetters = [
  {
    letter: "Extroverted",
    level: 56,
    color: "#3b82f6",
  },
  {
    letter: "Intuitive",
    level: 56,
    color: "#facc15",
  },
  {
    letter: "Thinking",
    level: 56,
    color: "#ef4444",
  },
  {
    letter: "Perceiving",
    level: 56,
    color: "#10b981",
  },
];

const ResultPage = () => {
  const { profileMenu, setProfileMenu, closeProfileMenu } =
    useContext(LayoutContext);
  const [sectionChoice, setSectionChoice] = useState(true);

  const handleChange = (valueChoice: boolean) => {
    setSectionChoice(valueChoice);
  };

  useEffect(() => {
    console.log(sectionChoice);
  }, [sectionChoice]);

  return (
    <div onClick={closeProfileMenu} className="relative overflow-hidden">
      <main className="container max-w-screen-xl text-gray-800 ">
        {/* blob */}
        <div className="absolute hidden lg:block -top-12 -right-[20%] xl:-right-8 scale-105 -z-10 opacity-60">
          <div className="absolute top-12 right-0 bg-green-300 rounded-full w-[600px] h-[100px] blur-3xl " />
          <div className="absolute top-24 right-8 -rotate-15 bg-blue-300 rounded-full w-[600px] h-[150px] blur-3xl " />
          <div className="absolute top-32 right-0 bg-fuchsia-300 rounded-full w-[500px] h-[200px] blur-3xl " />
          <div className="absolute top-44 right-80 bg-orange-200/50 rounded-full w-[300px] h-[200px] blur-3xl " />
          <div className="absolute top-44 -right-24 bg-yellow-200/60 rounded-full w-[500px] h-[300px] blur-3xl " />
        </div>

        <div className="absolute hidden lg:block top-[600px] left-[20%] -z-10 scale-125 opacity-60">
          <div className="absolute top-24 right-0 bg-green-300/50 rounded-full h-[500px] w-[300px] blur-3xl " />
          <div className="absolute top-36 right-8  bg-blue-300 rounded-full h-[300px] w-[150px] blur-3xl " />
          <div className="absolute top-32 right-24 bg-fuchsia-300 rounded-full h-[400px] w-[200px] blur-3xl " />
          <div className="absolute top-44 right-36 bg-orange-200/50 rounded-full h-[300px] w-[200px] blur-3xl " />
          <div className="absolute top-44 right-48 bg-yellow-200 rounded-full h-[400px] w-[300px] blur-3xl " />
        </div>

        {/* nav bar */}
        <NavBar
          image="https://i.pinimg.com/236x/bf/6a/eb/bf6aeb4b635873217fe411313a4e31f7.jpg"
          navType={true}
        />

        {/* typology navigation for mobile devices */}
        <div className="uppercase text-xs font-semibold bg-white py-2 mt-4 mb-8 flex justify-center rounded-md drop-shadow-lg md:hidden">
          <input
            type="radio"
            id="sectionChoice1"
            name="sectionNav"
            className="hidden"
            onChange={() => handleChange(true)}
            defaultChecked
          />
          <label
            className={`${
              !sectionChoice && "text-gray-400"
            } px-4 border-r border-gray-300`}
            htmlFor="sectionChoice1"
          >
            Calculations
          </label>

          <input
            type="radio"
            id="sectionChoice2"
            name="sectionNav"
            className="hidden"
            onChange={() => handleChange(false)}
          />
          <label
            className={`${sectionChoice && "text-gray-400"} px-4`}
            htmlFor="sectionChoice2"
          >
            typology
          </label>
        </div>

        <div className="hidden md:block">
          <Results indicator="profile-desktop" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            <div className="mb-10">
              <Traits type={true} traits={positiveTraits} />
            </div>

            <div className="mb-10">
              <Traits type={false} traits={positiveTraits} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultPage;
