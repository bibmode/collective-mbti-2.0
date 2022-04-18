import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../components/context/LayoutContext";
import NavBar from "../components/NavBar";
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

const ProfilePage = () => {
  const { profileMenu, setProfileMenu } = useContext(LayoutContext);
  const [sectionChoice, setSectionChoice] = useState(true);

  const handleChange = (valueChoice: boolean) => {
    setSectionChoice(valueChoice);
  };

  const closeProfileMenu = () => {
    if (profileMenu) setProfileMenu(false);
  };

  useEffect(() => {
    console.log(sectionChoice);
  }, [sectionChoice]);

  return (
    <div onClick={closeProfileMenu}>
      <main className="container max-w-screen-xl text-gray-800">
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

        {sectionChoice ? (
          <div className="md:hidden">
            <Results indicator="profile-mobile" />

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
              indicator="phone"
              letterResults={sampleResultLetters}
            />
          </div>
        )}

        <div className="hidden md:block">
          <Results indicator="profile-desktop" />

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
                  indicator="desktop"
                  letterResults={sampleResultLetters}
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
