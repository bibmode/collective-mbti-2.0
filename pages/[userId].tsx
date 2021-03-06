import { Icon } from "@iconify/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../components/context/LayoutContext";
import NavBar from "../components/NavBar";
import Results from "../components/Results";
import Traits from "../components/Traits";
import Typology from "../components/Typology";
import TypologyBar from "../components/TypologyBar";
import mbtiCalculator from "../hooks/mbtiCalculator";
import { prisma } from "../lib/prisma";
import avatar from "../public/avatars/casual-life-3d-avatar-with-redhead-woman-on-pink-background.png";
import {
  CognitiveFunctions,
  FourLetters,
  Results as ResultsType,
  TypologyResult,
} from "../types/result-types";

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

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { userId } = context.query;
  let selfType: ResultsType | null | undefined = null;
  let accumulative: ResultsType | null | undefined = null;
  let friendsType: ResultsType | null | undefined = null;
  let typology: TypologyResult[] | undefined | null | [] = [];
  let typologyRes = null,
    selfTypeRes = null;

  // find user
  const userRes = await prisma.user.findFirst({
    where: { id: userId },
    include: {
      typology: true,
      selfType: true,
    },
  });

  // get self type
  if (userRes?.selfType?.id) {
    selfTypeRes = await prisma.selfType.findFirst({
      where: {
        userId: userId,
      },
      include: {
        results: true,
      },
    });

    if (selfTypeRes?.results?.choices) {
      selfType = mbtiCalculator(selfTypeRes?.results?.choices);
    }
  }

  // get typology
  if (userRes?.typology && userRes?.typology?.length > 0) {
    typologyRes = await prisma.typology.findMany({
      where: {
        userId: userId,
      },
      include: {
        results: true,
      },
    });

    // const typologyPromised = await JSON.parse(JSON.stringify(channelRes));

    typology = typologyRes.map((typology) => {
      const results = mbtiCalculator(typology.results[0].choices);

      const typologyEntry = {
        name: typology.name,
        relationship: typology.relationship,
        comment: typology.comment,
        results,
      };

      return typologyEntry;
    });
  }

  // get accumulative friends result
  if (typologyRes) {
    let allChoicesMade: any[] = [];
    // typologyRes && console.log(typologyRes[0]?.results);
    if (typologyRes)
      allChoicesMade = typologyRes?.flatMap(
        (result) => result.results[0].choices
      );

    friendsType = mbtiCalculator(allChoicesMade);
  }

  // get accumulative result
  if (typologyRes || selfTypeRes) {
    let allChoicesMade: any[] = [];
    // typologyRes && console.log(typologyRes[0]?.results);
    if (typologyRes)
      allChoicesMade = typologyRes?.map((result) => result.results[0].choices);

    if (selfTypeRes) allChoicesMade.push(selfTypeRes.results?.choices);

    allChoicesMade = allChoicesMade.flat();

    accumulative = mbtiCalculator(allChoicesMade);
  }

  return {
    props: {
      selfType,
      friendsType,
      typology,
      accumulative,
    },
  };
};

type ProfilePageProps = {
  selfType: ResultsType | null | undefined;
  friendsType: ResultsType | null | undefined;
  accumulative: ResultsType | null | undefined;
  typology: TypologyResult[] | undefined | null | [];
};

const ProfilePage = ({
  selfType,
  friendsType,
  typology,
  accumulative,
}: ProfilePageProps) => {
  const { closeProfileMenu, resultsToggle, setResultsToggle } =
    useContext(LayoutContext);
  const [sectionChoice, setSectionChoice] = useState(true);

  useEffect(() => {
    if (accumulative) setResultsToggle(accumulative);
  }, [accumulative]);

  const handleChange = (valueChoice: boolean) => {
    setSectionChoice(valueChoice);
  };

  useEffect(() => {
    console.log(sectionChoice);
  }, [sectionChoice]);

  useEffect(() => {
    console.log("self type", selfType);
    console.log("friends type", friendsType);
    console.log("accumulate", accumulative);
    console.log("typology", typology);
  }, []);

  return (
    <div onClick={closeProfileMenu} className="relative overflow-x-hidden">
      <main className="container max-w-screen-xl text-gray-800 ">
        {/* blob */}
        <div className="absolute hidden lg:block -top-24 -right-[20%] 2xl:-right-[5%] scale-105 -z-10 opacity-60">
          <div className="absolute top-12 right-0 bg-green-300 rounded-full w-[600px] h-[100px] blur-3xl " />
          <div className="absolute top-24 right-8 -rotate-15 bg-blue-300 rounded-full w-[600px] h-[150px] blur-3xl " />
          <div className="absolute top-32 right-0 bg-fuchsia-300 rounded-full w-[500px] h-[200px] blur-3xl " />
          <div className="absolute top-48 right-80 bg-orange-200/80 rounded-full w-[300px] h-[200px] blur-3xl " />
          <div className="absolute top-44 -right-24 bg-yellow-200/80 rounded-full w-[500px] h-[300px] blur-3xl " />
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

        {sectionChoice ? (
          <div className="md:hidden">
            <Results indicator="profile-mobile" result={resultsToggle} />

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
          <Results indicator="profile-desktop" result={resultsToggle} />

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
