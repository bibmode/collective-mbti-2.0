import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { LayoutContext } from "./context/LayoutContext";
import ProfileMenu from "./ProfileMenu";

type Props = {
  image: string;
  navType: boolean;
};
const NavBar = ({ image, navType }: Props) => {
  const { setInviteModal, profileMenu, setProfileMenu, setPhoneMenu } =
    useContext(LayoutContext);

  const toggleInvite = () => {
    setInviteModal(true);
  };

  const openProfileMenu = () => {
    setProfileMenu(true);
  };

  const openPhoneMenu = () => {
    setPhoneMenu(true);
  };

  return (
    <nav className="flex relative items-center w-full justify-between py-8 lg:pt-12 md:mb-12">
      {/* profile menu for desktop */}
      {profileMenu && <ProfileMenu />}

      <Link href="/" passHref>
        <button className="flex items-center">
          <Image src="/logo.svg" alt="logo" width="50" height="50" />
          <h1 className="uppercase font-bold text-[21px] text-left w-28 leading-tight ml-3">
            collective mbti
          </h1>
        </button>
      </Link>

      {/* mobile hamburger button */}
      <label className="text-4xl -mt-5 md:hidden">
        <input
          className="hidden"
          type="checkbox"
          name="hamburger-menu"
          id="hamburger-menu"
          onChange={openPhoneMenu}
        />
        <Icon icon="heroicons-outline:menu-alt-3" />
      </label>

      {/* change for type fo page */}
      {navType ? (
        <div className="hidden md:flex text-xs">
          <Link href="/mbti-test" passHref>
            <button className="px-6 py-2 w-[137px] transition-all duration-300 bg-gray-800 text-white font-medium rounded-full hover:scale-105">
              Take the Test
            </button>
          </Link>
          <button
            className="px-6 py-2 ml-4 w-[137px] transition-all duration-300 text-gray-600 bg-white border border-gray-300 font-medium rounded-full hover:scale-105"
            onClick={toggleInvite}
          >
            Invite friends to type you
          </button>
        </div>
      ) : (
        <div className="hidden md:block text-3xl font-semibold">
          <span className="text-blue-600">M</span>
          <span className="text-yellow-400">B</span>
          <span className="text-red-600">T</span>
          <span className="text-green-600 mr-2">I</span>
          TEST
        </div>
      )}

      {/* profile button */}
      <div className="hidden md:flex items-center">
        <p className="text-[15px] max-w-[100px] mr-3 text-right leading-tight font-semibold text-gray-700">
          GENEVIEVE NAVALES
        </p>
        <button
          onClick={openProfileMenu}
          onMouseEnter={openProfileMenu}
          className="relative border-2 border-gray-800 hover:border-blue-500 transition-all duration-300 h-12 w-12 rounded-full overflow-hidden"
        >
          <Image src={image} alt="user image" layout="fill" objectFit="cover" />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
