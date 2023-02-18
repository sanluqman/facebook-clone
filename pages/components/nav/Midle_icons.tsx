import React from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

type navIconsProps = {
  activeIcone: string;
  setActiveIcone: React.Dispatch<React.SetStateAction<string>>;
};

const NavIcons: React.FC<navIconsProps> = ({ activeIcone, setActiveIcone }) => {
  return (
    <div className="flex justify-around h-full w-1/3 ">
      <div
        className="flex flex-col justify-between align-middle text-[30px] transition-all"
        onClick={() => setActiveIcone("home")}
      >
        <BsFillHouseDoorFill
          className={
            activeIcone === "home" ? "text-blue-500" : "bg-transparent"
          }
        />
        <div
          className={
            activeIcone === "home" ? "bg-blue-500 h-[2px]" : "bg-black h-[2px]"
          }
        ></div>
      </div>
      <div
        className="flex flex-col justify-between align-middle text-[30px] transition-all"
        onClick={() => setActiveIcone("friends")}
      >
        <FaUserFriends
          className={
            activeIcone === "friends" ? "text-blue-500" : "bg-transparent"
          }
        />
        <div
          className={
            activeIcone === "friends"
              ? "bg-blue-500 h-[2px]"
              : "bg-black h-[2px]"
          }
        ></div>
      </div>
    </div>
  );
};
export default NavIcons;
