import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { createContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EditModal from "../EditModal";
import InviteModal from "../InviteModal";
import PhoneMenu from "../PhoneMenu";

type Props = {
  children: React.ReactNode;
};

type LayoutContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  inviteModal: boolean;
  setInviteModal: React.Dispatch<React.SetStateAction<boolean>>;
  phoneMenu: boolean;
  setPhoneMenu: React.Dispatch<React.SetStateAction<boolean>>;
  profileMenu: boolean;
  setProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  closeProfileMenu: () => void;
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LayoutContext = createContext({} as LayoutContextType);

const LayoutContextProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inviteModal, setInviteModal] = useState<boolean>(false);
  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const [phoneMenu, setPhoneMenu] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [underlay, setUnderlay] = useState(false);

  const closeProfileMenu = () => {
    if (profileMenu) setProfileMenu(false);
  };

  const closeModal = () => {
    setEditModal(false);
    setPhoneMenu(false);
    setInviteModal(false);
    console.log("iclose dude");
  };

  const modalOpenedChecker = () => {
    if (inviteModal || editModal || phoneMenu) setUnderlay(true);
    else setUnderlay(false);
  };

  useEffect(() => {
    modalOpenedChecker();
  }, [inviteModal, editModal, phoneMenu]);

  return (
    <LayoutContext.Provider
      value={{
        loading,
        setLoading,
        inviteModal,
        setInviteModal,
        phoneMenu,
        setPhoneMenu,
        profileMenu,
        setProfileMenu,
        closeProfileMenu,
        editModal,
        setEditModal,
      }}
    >
      <div className="bg-blue-50/20 relative">
        <AnimatePresence>{editModal && <EditModal />}</AnimatePresence>
        <AnimatePresence>{phoneMenu && <PhoneMenu />}</AnimatePresence>
        <AnimatePresence>{inviteModal && <InviteModal />}</AnimatePresence>
        <AnimatePresence>
          {underlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-screen w-screen bg-gray-800/70 fixed z-30"
            ></motion.div>
          )}
        </AnimatePresence>
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
