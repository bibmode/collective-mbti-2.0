import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import envelope from "../public/user images/casual-life-3d-white-envelope-with-blue-letter 1.png";
import { LayoutContext } from "./context/LayoutContext";
import { motion } from "framer-motion";

const InviteModal = () => {
  const { setInviteModal } = useContext(LayoutContext);
  const [copyIndicator, setCopyIndicator] = useState(false);

  const linkRef = useRef<HTMLInputElement>(null);

  const copyLink = () => {
    if (linkRef.current) navigator.clipboard.writeText(linkRef.current?.value);
    setCopyIndicator(true);

    setTimeout(() => {
      setCopyIndicator(false);
    }, 1500);
  };

  return (
    <motion.div
      className="fixed z-40"
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      exit={{ y: -1000 }}
      transition={{ type: "spring", bounce: 0.05 }}
    >
      {/* invite modal */}
      <div className="absolute z-30 drop-shadow-lg sm:top-[50%] sm:left-[50%] sm:-translate-x-[50%] sm:-translate-y-[50%] w-full sm:max-w-md px-6 py-8 bg-white  sm:rounded-3xl">
        {/* close button */}

        {/* header */}
        <div className="relative flex items-center justify-center ml-2 text-gray-700">
          <Image src={envelope} alt="envelope" width={45} height={45} />
          <h3 className="text-lg  font-semibold leading-tight ml-3 w-full max-w-[10rem]">
            Invite Someone to Type You
          </h3>

          <button
            className="absolute text-2xl right-0 top-0"
            onClick={() => setInviteModal(false)}
          >
            <Icon icon="eva:close-fill" />
          </button>
        </div>

        {/* pronoun */}
        <div className="flex justify-between items-center px-4 mt-4">
          <p>Your preferred pronouns: </p>

          {/* selection */}
          <div className="relative w-fit">
            <select className="block bg-gray-800 text-white pl-4 pr-8 py-2 ml-auto rounded-full appearance-none focus:outline-none focus:shadow-outline">
              <option value="female">She/Her</option>
              <option value="male">He/Him</option>
              <option value="non-binary">They/Them</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-2 text-white">
              <Icon icon="ant-design:caret-down-filled" />
            </div>
          </div>
        </div>

        {/* link to send */}
        <div className="w-full relative flex bg-blue-100 px-4 py-2 rounded-full mt-6 mb-4">
          <input
            className="w-full focus:outline-0 bg-transparent pr-2"
            type="text"
            name="inviteModal"
            id="inviteModal"
            value="http://localhost:3000/mbti-test/sdgdsj223d"
            readOnly
            ref={linkRef}
          />

          <button className="text-blue-600 peer" onClick={copyLink}>
            <Icon icon="bxs:copy-alt" />
          </button>

          <p className="hidden absolute peer-hover:block -top-5 right-1 text-gray-500 text-xs">
            {copyIndicator ? "Copied" : "Copy"}
          </p>
        </div>

        {/* text */}
        <p className="text-sm text-center px-4 mt-3 text-gray-500">
          This link is effective for{" "}
          <span className="underline">anyone you give it to</span>. They will
          then be redirected to the MBTI test to type you.
        </p>
      </div>

      {/* overlay */}
      <div
        className="h-screen w-screen"
        onClick={() => setInviteModal(false)}
      ></div>
    </motion.div>
  );
};

export default InviteModal;
