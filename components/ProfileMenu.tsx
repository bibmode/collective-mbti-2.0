import { Icon } from "@iconify/react";
import React, { useContext, useLayoutEffect, useRef } from "react";
import { LayoutContext } from "./context/LayoutContext";

const ProfileMenu = () => {
  const handleLogout = () => {};

  const handleEdit = () => {};

  return (
    <div className="absolute z-50 right-0 -bottom-14 bg-white drop-shadow-lg rounded-xl overflow-hidden">
      <button
        onClick={handleEdit}
        className="flex items-center justify-between w-full hover:text-blue-700 hover:bg-blue-100 py-2 px-5"
      >
        <span className="mr-5">Edit</span>
        <Icon icon="eva:edit-2-outline" />
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center justify-between w-full hover:text-blue-700 hover:bg-blue-100 py-2 px-5"
      >
        <span className="mr-5">Logout</span>
        <Icon icon="fluent:arrow-exit-20-filled" />
      </button>
    </div>
  );
};

export default ProfileMenu;
