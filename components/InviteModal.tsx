import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import envelope from "../public/user images/casual-life-3d-white-envelope-with-blue-letter 1.png";
import { LayoutContext } from "./context/LayoutContext";

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
    <div className="fixed z-40">
      {/* invite modal */}
      <div className="absolute z-30 drop-shadow-lg top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full max-w-md px-6 py-8 bg-white  rounded-3xl">
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

          <p className="hidden absolute peer-hover:block -top-6 right-1 text-gray-500 text-xs">
            {copyIndicator ? "Copied" : "Copy"}
          </p>
        </div>

        {/* text */}
        <p className="text-sm text-center px-4 mt-3 text-gray-500">
          This link is effective for{" "}
          <span className="underline">anyone you give it to</span>. They will
          then be redirected to the MBTI test to type you
        </p>
      </div>

      {/* overlay */}
      <div
        className="h-screen w-screen bg-gray-800/70"
        onClick={() => setInviteModal(false)}
      ></div>
    </div>
  );
};

export default InviteModal;
