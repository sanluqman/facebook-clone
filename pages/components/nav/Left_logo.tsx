import React, { useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";

type navLogoSearchProps = {
  allUsers: any;
};

const NavLogoSearch: React.FC<navLogoSearchProps> = ({ allUsers }) => {
  const [showFrindlist, setShowFrindlist] = useState(false);
  const [searchaUser, setSearchaUser] = useState("");
  let filteredUsers;
  if (allUsers) {
    filteredUsers = allUsers.filter((user: any) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(searchaUser.toLowerCase()) ||
        (user.profileimg &&
          user.profileimg.toLowerCase().includes(searchaUser.toLowerCase()))
      );
    });
  }

  return (
    <div className="flex justify-start align-middle ml-2 w-1/3  ">
      {showFrindlist ? (
        <button onClick={() => setShowFrindlist((prev) => !prev)}>back</button>
      ) : (
        <BsFacebook className="text-blue-500 text-[40px]" />
      )}
      <div
        className="flex align-middle justify-center w-[240px] relative ml-2  "
        onClick={() => setShowFrindlist((prev) => !prev)}
      >
        <BiSearch className="absolute left-3 top-[13.5px] text-gray-500" />
        <input
          type="text"
          placeholder="Search Facebook"
          className="bg-[#F0F2F5] rounded-2xl w-full pl-8 text-black placeholder:text-gray-500 text-[15px] outline-none"
          onChange={(e) => setSearchaUser(e.target.value)}
          value={searchaUser}
        />
      </div>
      {showFrindlist && (
        <div className=" absolute top-[50px] w-[300px] h-[500px] shadow-lg rounded-lg z-50 bg-white p-3">
          <div className="flex justify-between">
            <h1>Recent searches</h1>
            <h1>Edit</h1>
          </div>
          {filteredUsers &&
            filteredUsers.map((user: any) => {
              return (
                <Link
                  href={`profile/${user.id}`}
                  className="flex items-center justify-between hover:bg-gray-200 rounded-lg px-5 py-3 transition"
                  key={user.id}
                >
                  <div className="flex items-center">
                    {user.profileimg ? (
                      <img src={user.profileimg} className="h-9 w-9 mr-1" />
                    ) : (
                      <CgProfile className="text-4xl mr-1" />
                    )}
                    <h1>
                      {user.firstName} {user.lastName}
                    </h1>
                  </div>
                  <div className="">
                    <button className="">x</button>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default NavLogoSearch;
