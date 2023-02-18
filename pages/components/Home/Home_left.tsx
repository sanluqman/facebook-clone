import { signUpUserInfoTypes } from "@/pages/types/authtype";
import { User } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";

type Home_leftProps = {
  userInfo: signUpUserInfoTypes;
};

const Home_left: React.FC<Home_leftProps> = ({ userInfo }) => {
  const userName = `${userInfo.firstName} ${userInfo.lastName}`;
  return (
    <div className="flex flex-col  p-4 bg-[#F0F2F5] overflow-y-auto">
      <div className="flex justify-start align-middle  p-2 hover:bg-[#E4E6E9]">
        {userInfo.profileimg ? (
          <img src={userInfo.profileimg} className="text-2xl mr-2" />
        ) : (
          <CgProfile className="text-2xl mr-2" />
        )}
        <h1 className="font-medium">{userName}</h1>
      </div>
      <Link
        href="/friends"
        className="flex justify-start align-middle  p-2 hover:bg-[#E4E6E9]"
      >
        <FaUserFriends className="text-2xl mr-2" />
        <h1>Friends</h1>
      </Link>
    </div>
  );
};
export default Home_left;
