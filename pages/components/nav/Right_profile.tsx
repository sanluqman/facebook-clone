import React, { useState } from "react";
import Menu from "./navrightsidemodels/Menu";
import { TbGridDots } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Profile from "./navrightsidemodels/Profile";
import { signUpUserInfoTypes } from "@/pages/types/authtype";

type nav_profileProps = {
  userInfo: signUpUserInfoTypes;
};

const Nav_profile: React.FC<nav_profileProps> = ({ userInfo }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  console.log(userInfo);
  return (
    <div className="w-1/3  flex justify-end align-middle ">
      <button
        onClick={() => setOpenMenu((prev) => !prev)}
        className="bg-[#F0F2F5] rounded-full text-2xl p-1 font-bold mr-2"
      >
        <TbGridDots className="" />
      </button>
      <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} />
      {userInfo.profileimg ? (
        <img src={userInfo.profileimg} className="h-9 w-9" alt="" />
      ) : (
        <button
          onClick={() => setOpenProfile((prev) => !prev)}
          className="bg-[#F0F2F5] rounded-full text-2xl p-1 font-bold mr-2"
        >
          <CgProfile />
        </button>
      )}

      <Profile openProfile={openProfile} setOpenProfile={setOpenProfile} />
    </div>
  );
};
export default Nav_profile;
