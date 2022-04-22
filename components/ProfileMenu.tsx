import { Icon } from "@iconify/react";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { LayoutContext } from "./context/LayoutContext";

const ProfileMenu = () => {
  const { setEditModal, setProfileMenu, profileId } = useContext(LayoutContext);

  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
  };

  const handleEdit = () => {
    setEditModal(true);
  };

  const closeProfileMenu = () => {
    setProfileMenu(false);
  };

  return (
    <div
      className="absolute z-50 right-0 top-[85%] bg-white drop-shadow-lg rounded-xl overflow-hidden"
      onMouseLeave={closeProfileMenu}
    >
      <Link href={`/${profileId}`} passHref>
        <button className="flex items-center justify-start w-full hover:text-blue-700 hover:bg-blue-50 py-2 pl-4 pr-8">
          <Icon icon="gg:profile" />
          <span className="ml-2">Profile</span>
        </button>
      </Link>
      <button
        onClick={handleEdit}
        className="flex items-center justify-start w-full hover:text-blue-700 hover:bg-blue-50 py-2 pl-4 pr-8"
      >
        <Icon icon="eva:edit-2-outline" />
        <span className="ml-2">Edit</span>
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center justify-start w-full hover:text-blue-700 hover:bg-blue-50 py-2 pl-4 pr-8"
      >
        <Icon icon="fluent:arrow-exit-20-filled" />
        <span className="ml-2">Logout</span>
      </button>
    </div>
  );
};

export default ProfileMenu;
