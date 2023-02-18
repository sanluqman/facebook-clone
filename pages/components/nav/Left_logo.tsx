import React from "react";
import { BsFacebook } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

type navLogoSearchProps = {};

const NavLogoSearch: React.FC<navLogoSearchProps> = () => {
  return (
    <div className="flex justify-start align-middle ml-2 w-1/3 ">
      <BsFacebook className="text-blue-500 text-[40px]" />
      <div className="flex align-middle justify-center w-[240px] relative ml-2">
        <BiSearch className="absolute left-3 top-[13.5px] text-gray-500" />
        <input
          type="text"
          placeholder="Search Facebook"
          className="bg-[#F0F2F5] rounded-2xl w-full pl-8 text-black placeholder:text-gray-500 text-[15px]"
        />
      </div>
    </div>
  );
};
export default NavLogoSearch;
