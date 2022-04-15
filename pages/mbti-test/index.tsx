import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SelfTest = () => {
  return (
    <div>
      <main className="container max-w-screen-xl text-gray-700">
        {/* nav bar */}
        <nav className="flex items-center justify-between py-8 lg:pt-12 md:mb-12">
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
        <div className="bg-white rounded-3xl mt-4 px-6 py-8 drop-shadow-lg">
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
        <div className="flex items-center">
          <div className="relative w-full h-4 bg-gray-100 rounded-full my-12 mr-3">
            <div
              className="h-4 bg-transparent clip-background rounded-full"
              style={{ width: "30%" }}
            >
              <div className="h-4 w-full absolute left-0 top-0 clip-background rounded-full bg-rainbow" />
            </div>
          </div>

          <p className="font-semibold">30%</p>
        </div>
      </main>
    </div>
  );
};

export default SelfTest;
