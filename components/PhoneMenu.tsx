import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import envelope from "../public/user images/casual-life-3d-white-envelope-with-blue-letter 1.png";
import { LayoutContext } from "./context/LayoutContext";

const PhoneMenu = () => {
  const { phoneMenu, setPhoneMenu, setEditModal } = useContext(LayoutContext);

  const closeModal = () => {
    setPhoneMenu(false);
  };

  const handleEdit = () => {
    closeModal();
    setEditModal(true);
  };

  return (
    <div className="fixed w-full z-50">
      <div className="absolute w-full px-6 bg-white drop-shadow-xl">
        {/* header */}
        <div className="pt-8 pb-4 flex justify-between items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src="https://i.pinimg.com/236x/bf/6a/eb/bf6aeb4b635873217fe411313a4e31f7.jpg"
              alt="user image"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <p className="w-1/2 mr-auto ml-2 font-semibold">GENEVIEVE NAVALES</p>

          <button className="text-3xl -mt-4 -mr-2" onClick={closeModal}>
            <Icon icon="eva:close-fill" />
          </button>
        </div>

        {/* basic menu */}
        <button
          onClick={handleEdit}
          className="flex text-lg items-center justify-between w-full py-2 border-b border-gray-200"
        >
          <span className="mr-5">Edit</span>
          <Icon icon="eva:edit-2-outline" />
        </button>
        <button
          onClick={closeModal}
          className="flex text-lg items-center justify-between w-full py-2 border-b border-gray-200"
        >
          <span className="mr-5">Logout</span>
          <Icon icon="fluent:arrow-exit-20-filled" />
        </button>

        <Link href="/mbti-test" passHref>
          <button
            onClick={closeModal}
            className="px-6 py-3 my-4 w-full bg-gray-800 text-white font-medium rounded-full"
          >
            Take the Test
          </button>
        </Link>

        <div className="border-t border-gray-800 -mx-6 py-3 flex justify-center items-center">
          <Image src={envelope} alt="envelope" width={27} height={27} />
          <h2 className="ml-2 font-medium">Invite friends to type you</h2>
        </div>

        <div className="bg-gray-900 -mx-6 px-6 py-7 text-white">
          {/* link */}
          <div className="w-full relative flex bg-blue-400/10 border border-blue-500 px-4 py-3 rounded-full mb-3">
            <input
              className="w-full focus:outline-0 bg-transparent pr-2 text-sm"
              type="text"
              name="inviteModal"
              id="inviteModal"
              value="http://localhost:3000/mbti-test/sdgdsj223d"
              readOnly
            />

            <button className="text-blue-300 peer text-xl">
              <Icon icon="bxs:copy-alt" />
            </button>

            <p className="hidden absolute peer-hover:block -top-5 right-1 text-xs">
              Copied
            </p>
          </div>

          {/* text */}
          <p className="text-sm text-center mt-3 ">
            This link is effective for{" "}
            <span className="underline">anyone you give it to</span>. They will
            then be redirected to the MBTI test to type you.
          </p>
        </div>
      </div>

      {/* overlay */}
      <div
        className="h-screen w-screen bg-gray-800/50"
        onClick={closeModal}
      ></div>
    </div>
  );
};

export default PhoneMenu;
