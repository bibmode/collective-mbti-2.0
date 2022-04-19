import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { createContext, useRef, useState } from "react";
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

  const closeProfileMenu = () => {
    if (profileMenu) setProfileMenu(false);
  };

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
      <div className="bg-blue-50/20">
        {editModal && <EditModal />}
        {phoneMenu && <PhoneMenu />}
        {inviteModal && <InviteModal />}
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
