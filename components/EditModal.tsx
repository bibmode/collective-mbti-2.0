import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useContext } from "react";
import arttools from "../public/user images/casual-life-3d-glass-for-pencils.png";
import { LayoutContext } from "./context/LayoutContext";
import { motion } from "framer-motion";

const EditModal = () => {
  const { setEditModal, userLoggedIn } = useContext(LayoutContext);

  const closeModal = () => {
    setEditModal(false);
  };

  return (
    <motion.div
      className="fixed z-[70]"
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      exit={{ y: -1000 }}
      transition={{ type: "spring", bounce: 0.05 }}
    >
      {/* invite modal */}
      <div className="absolute z-30 drop-shadow-lg md:top-[50%] left-[50%] -translate-x-[50%] md:-translate-y-[50%] w-full md:max-w-md px-6 py-8 bg-white md:rounded-3xl">
        {/* close button */}
        {/* header */}
        <div className="relative flex items-center justify-center ml-2 mb-3 text-gray-700">
          <Image src={arttools} alt="envelope" width={45} height={45} />

          <h3 className="text-lg  font-semibold leading-tight -ml-2 w-full max-w-[10rem]">
            Edit your details
          </h3>

          <button
            className="absolute text-2xl right-0 top-0"
            onClick={closeModal}
          >
            <Icon icon="eva:close-fill" />
          </button>
        </div>

        {/* text */}
        <p className="text-sm text-center px-4 mt-3 mb-3 text-gray-500">
          The changes will be reflected in your profile and when you give the
          test link to your friends.
        </p>

        {/* image change  */}
        <input
          type="file"
          accept="image/*"
          name="editImage"
          id="editImage"
          className="hidden"
        />
        <label
          htmlFor="editImage"
          className="flex items-center w-fit cursor-pointer text-gray-50/40 hover:text-gray-50/80"
        >
          <div className="text-3xl  bg-gray-500 relative w-16 h-16 rounded-full overflow-hidden">
            <Icon
              icon="bxs:camera"
              className="absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] z-10"
            />
            <Image
              src={
                userLoggedIn
                  ? `${userLoggedIn.getImage()}`
                  : "https://i.pinimg.com/236x/bf/6a/eb/bf6aeb4b635873217fe411313a4e31f7.jpg"
              }
              alt="user image"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <p className="ml-3 text-gray-600">Change photo</p>
        </label>

        {/* name change */}

        <div className="w-full relative flex bg-blue-50 px-4 py-2 rounded-full mt-8 mb-4">
          <label
            htmlFor="editName"
            className="absolute -top-5 text-sm text-gray-600"
          >
            Name
          </label>
          <input
            className="w-full focus:outline-0 bg-transparent pr-2"
            type="text"
            name="editName"
            id="editName"
            defaultValue={
              userLoggedIn ? `${userLoggedIn.getName()}` : "Genevieve Navales"
            }
          />
        </div>

        {/* buttons */}
        <div className="text-white flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-full">
            Save
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 px-6 py-2 ml-3 rounded-full">
            Cancel
          </button>
        </div>
      </div>

      {/* overlay */}
      <motion.div
        className="h-screen w-screen"
        onClick={closeModal}
      ></motion.div>
    </motion.div>
  );
};

export default EditModal;
