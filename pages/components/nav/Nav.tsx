import React, { useState } from "react";
import NavLogoSearch from "./Left_logo";
import NavIcons from "./Midle_icons";
import Nav_profile from "./Right_profile";
import { signUpUserInfoTypes } from "@/pages/types/authtype";

type NavProps = {
  allUsers: any;
  userInfo: signUpUserInfoTypes;
};

const Nav: React.FC<NavProps> = ({ allUsers, userInfo }) => {
  const [activeIcone, setActiveIcone] = useState("home");

  return (
    <div className="flex p-2 bg-white shadow-md h-[9vh]">
      <NavLogoSearch allUsers={allUsers} />
      <NavIcons activeIcone={activeIcone} setActiveIcone={setActiveIcone} />
      <Nav_profile userInfo={userInfo} />
    </div>
  );
};
export default Nav;
