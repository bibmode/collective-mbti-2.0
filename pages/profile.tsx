import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Results from "../components/Results";
import Traits from "../components/Traits";
import Typology from "../components/Typology";
import TypologyBar from "../components/TypologyBar";
import avatar from "../public/avatars/casual-life-3d-avatar-with-redhead-woman-on-pink-background.png";

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

const ProfilePage = () => {
  const [sectionChoice, setSectionChoice] = useState(true);

  const handleChange = (valueChoice: boolean) => {
    setSectionChoice(valueChoice);
  };

  useEffect(() => {
    console.log(sectionChoice);
  }, [sectionChoice]);

  return (
    <div>
      <main className="container max-w-screen-xl text-gray-800">
        {/* nav bar */}
        <nav className="flex items-center justify-between py-8 md:mb-12">
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

          {/* desktop navigation menu */}
          <div className="hidden md:flex text-xs">
            <button className="px-6 py-2 w-[137px] bg-gray-800 text-white font-medium rounded-full">
              Take the Test
            </button>
            <button className="px-6 py-2 ml-4 w-[137px] text-gray-600 bg-white border border-gray-300 font-medium rounded-full">
              Invite friends to type you
            </button>
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

        {sectionChoice ? (
          <div className="md:hidden">
            <Results />

            <div className="mb-10">
              <Traits type={true} traits={positiveTraits} />
            </div>

            <div className="mb-10">
              <Traits type={false} traits={positiveTraits} />
            </div>
          </div>
        ) : (
          <div className="md:hidden">
            <TypologyBar />

            <Typology
              avatar={avatar}
              results={sampleResultCognitive}
              name="Selena"
              relationship="Friend"
              mbtiType="INTP"
              comment="dza dzaug hahahhahha"
              date="2/17/2022 at 3:22 PM"
            />
          </div>
        )}

        <div className="hidden md:block">
          <Results />

          <div className="flex justify-between">
            <div className="grow mr-8 lg:mr-12">
              <div className="md:w-full">
                <TypologyBar />

                <Typology
                  avatar={avatar}
                  results={sampleResultCognitive}
                  name="Selena"
                  relationship="Friend"
                  mbtiType="INTP"
                  comment="dza dzaug hahahhahha"
                  date="2/17/2022 at 3:22 PM"
                />
              </div>
            </div>

            <div className="max-w-xs">
              <div className="mb-10">
                <Traits type={true} traits={positiveTraits} />
              </div>

              <div className="mb-10">
                <Traits type={false} traits={positiveTraits} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
