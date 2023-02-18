import { signUpUserInfoTypes } from "@/pages/types/authtype";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdImages } from "react-icons/io";
import CreatePostModel from "./CreatePostModel";
import { User } from "firebase/auth";

type MakepostProps = {
  userInfo: signUpUserInfoTypes;
  user: User;
  storage: any;
};

const Makepost: React.FC<MakepostProps> = ({ user, userInfo, storage }) => {
  const [openPostModel, setOpenPostModel] = useState(false);
  return (
    <div className="flex flex-col p-3 bg-white rounded-xl">
      <div className="flex align-middle justify-center">
        {userInfo.profileimg ? (
          <img src={userInfo.profileimg} className="h-9 w-9 mr-2 mt-1" />
        ) : (
          <CgProfile className="text-4xl mr-2 mt-1" />
        )}
        <h1
          onClick={() => setOpenPostModel((prev) => !prev)}
          className="bg-[#F0F2F5] rounded-2xl w-full p-2 text-lg hover:bg-[#E4E6E9]"
        >{`What is on your mind, ${userInfo.firstName}`}</h1>
      </div>
      <div className="w-full h-[2px] bg-gray-300 mt-2 mb-2"></div>
      <div className="flex align-middle justify-center">
        <IoMdImages className="text-3xl text-green-500 mt-[2px]" />
        <h1
          onClick={() => setOpenPostModel((prev) => !prev)}
          className="ml-2 mt-1 "
        >
          photo/video
        </h1>
      </div>
      {openPostModel && (
        <CreatePostModel
          setOpenPostModel={setOpenPostModel}
          openPostModel={openPostModel}
          userInfo={userInfo}
          user={user}
          storage={storage}
        />
      )}
    </div>
  );
};
export default Makepost;
