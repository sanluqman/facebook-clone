import React from "react";
import Makepost from "./makepost/Makepost";
import Posts from "./posts/Posts";
import Storie from "./stories/Storie";
import { signUpUserInfoTypes } from "@/pages/types/authtype";
import { User } from "firebase/auth";
import { FirebaseApp } from "firebase/app";

type Home_mainProps = {
  userInfo: signUpUserInfoTypes;
  user: User;
  storage: any;
  firestore: any;
};

const Home_main: React.FC<Home_mainProps> = ({
  user,
  userInfo,
  storage,
  firestore,
}) => {
  return (
    <div className="flex flex-col overflow-y-auto">
      <Storie />
      <Makepost userInfo={userInfo} user={user} storage={storage} />
      <Posts firestore={firestore} user={user} />
    </div>
  );
};
export default Home_main;
