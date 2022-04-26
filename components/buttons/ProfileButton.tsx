import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { LayoutContext } from "../context/LayoutContext";

const ProfileButton = () => {
  const { setProfileMenu } = useContext(LayoutContext);

  const { data: session, status } = useSession();

  const openProfileMenu = () => {
    setProfileMenu(true);
  };

  return (
    <div className="hidden md:flex items-center">
      <p className="text-[15px] max-w-[100px] mr-3 text-right leading-tight font-semibold text-gray-700 uppercase">
        {session?.user.name}
      </p>
      <button
        onClick={openProfileMenu}
        onMouseEnter={openProfileMenu}
        className="relative border-2 border-gray-800 hover:border-blue-500 transition-all duration-300 h-12 w-12 rounded-full overflow-hidden"
      >
        <Image
          src={`${session?.user.image}`}
          alt="user image"
          layout="fill"
          objectFit="cover"
        />
      </button>
    </div>
  );
};

export default ProfileButton;
