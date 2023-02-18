import React, { useState } from "react";
import NavLogoSearch from "./Left_logo";
import NavIcons from "./Midle_icons";
import Nav_profile from "./Right_profile";

type NavProps = {};

const Nav: React.FC<NavProps> = () => {
  const [activeIcone, setActiveIcone] = useState("home");

  return (
    <div className="flex p-2 bg-white shadow-md h-[9vh]">
      <NavLogoSearch />
      <NavIcons activeIcone={activeIcone} setActiveIcone={setActiveIcone} />
      <Nav_profile />
    </div>
  );
};
export default Nav;
