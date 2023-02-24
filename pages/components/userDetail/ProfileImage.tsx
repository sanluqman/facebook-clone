import { type } from "os";
import React, { useState } from "react";
import ChnageProfileModel from "./ChnageProfileModel";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/pages/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";

type ProfileImageProps = {
  coverimg: string;
  profileimg: string;
  username: string;
  userid: string;
  ifAdded: boolean;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  coverimg,
  profileimg,
  username,
  userid,
  ifAdded,
}) => {
  const [user] = useAuthState(auth);

  const [shoeChangeProfile, setShoeChangeProfile] = useState(false);
  const [chnageImageModel, setChnageImageModel] = useState(false);

  const addFriend = async () => {
    // geting refrense
    const getingPostQuery = query(
      collection(firestore, "users", user!.uid, "friends")
    );
    // get data
    const querySnapshot = await getDocs(getingPostQuery);

    let friend: any;
    querySnapshot.forEach((doc) => {
      friend = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    let friendid;
    if (friend) {
      friend.filter((fid: any) => {
        if (fid.id === friend[0].id) {
          friendid = fid;
        }
      });
    }

    if (!friendid) {
      await addDoc(collection(firestore, "users", user!.uid, "friends"), {
        friendid: userid,
        friendname: username,
        friendProfileImg: profileimg,
      }).then(() => {
        console.log("added friend");
      });
    } else {
      const deleteDocRef = doc(
        firestore,
        `users/${user!.uid}/friends`,
        friendid!.id
      );
      deleteDoc(deleteDocRef).then(() => {
        console.log("removed friend");
      });
    }
  };

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
                  {/* {userid == user!.uid && shoeChangeProfile && (
                    <button
                      onClick={() => setChnageImageModel((prev) => !prev)}
                    >
                      change profile image
                    </button>
                  )} */}
                </div>
              )}
            </div>
            {/* {userid == user!.uid && chnageImageModel && (
              <ChnageProfileModel
                chnageImageModel={chnageImageModel}
                setChnageImageModel={setChnageImageModel}
              />
            )} */}
            {profileimg ? (
              <div className="ml-4 text-2xl font-bold">{username}</div>
            ) : (
              <div className="ml-52 text-2xl font-bold">{username}</div>
            )}
          </div>
          <div
            className="bg-sky-500 px-5 py-3 rounded-lg mr-20 mt-10"
            onClick={() => addFriend()}
          >
            {ifAdded ? "Friends" : "Add friend"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileImage;
