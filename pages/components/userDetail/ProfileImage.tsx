import { type } from "os";
import React, { useState } from "react";
import ChnageProfileModel from "./ChnageProfileModel";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/pages/firebase";

type ProfileImageProps = {
  coverimg: string;
  profileimg: string;
  username: string;
  userid: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  coverimg,
  profileimg,
  username,
  userid,
}) => {
  const [user] = useAuthState(auth);

  const [shoeChangeProfile, setShoeChangeProfile] = useState(false);
  const [chnageImageModel, setChnageImageModel] = useState(false);

  return (
    <div className="bg-white h-screen container w-full flex justify-center relative">
      <div className="w-[900px]">
        <div className="flex justify-center relative">
          {coverimg ? (
            <img src={coverimg} alt="" />
          ) : (
            <div className="bg-sky-500 w-full h-[400px] rounded-lg ">a</div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex ml-10">
            <div className="">
              {profileimg ? (
                <div className="w-[180px] h-[180px] rounded-full ">
                  <div
                    className=" w-[180px] h-[180px] rounded-full 
                   absolute mt-[-30px] flex justify-center align-middle"
                  >
                    <img
                      src={profileimg}
                      alt=""
                      onClick={() => setShoeChangeProfile((prev) => !prev)}
                    />
                    {userid == user!.uid && shoeChangeProfile && (
                      <button
                        onClick={() => setChnageImageModel((prev) => !prev)}
                        className=" absolute top-0 bottom-0 rounded-full w-[180px] h-[180px]"
                      >
                        <h1 className="bg-gray-500 bg-opacity-50 rounded-full">
                          change profile image
                        </h1>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setShoeChangeProfile((prev) => !prev)}
                  className="bg-sky-900 w-[180px] h-[180px] rounded-full 
                  absolute mt-[-30px] flex justify-center align-middle"
                >
                  {userid == user!.uid && shoeChangeProfile && (
                    <button
                      onClick={() => setChnageImageModel((prev) => !prev)}
                    >
                      change profile image
                    </button>
                  )}
                </div>
              )}
            </div>
            {userid == user!.uid && chnageImageModel && (
              <ChnageProfileModel
                chnageImageModel={chnageImageModel}
                setChnageImageModel={setChnageImageModel}
              />
            )}
            {profileimg ? (
              <div className="ml-4 text-2xl font-bold">{username}</div>
            ) : (
              <div className="ml-52 text-2xl font-bold">{username}</div>
            )}
          </div>
          <div className="">add</div>
        </div>
      </div>
    </div>
  );
};
export default ProfileImage;
