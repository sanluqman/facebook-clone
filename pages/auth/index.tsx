"use client";
import React, { useState } from "react";
import Signin from "../components/Auth/Signin";
import Signup from "../components/Auth/Signup";
import { auth } from "../firebase";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  const [openSignup, setOpenSignup] = useState(false);
  const [signUpUserInfo, setSignUpUserInfo] = useState({
    firstName: "",
    lastName: "",
    months: "",
    days: "",
    year: "",
    gender: "",
    friendsNumber: 0,
    profileimg: "",
    coverimg: "",
  });
  return (
    <>
      <div className="h-screen relative">
        <Signin
          authState={openSignup}
          setAuthState={setOpenSignup}
          auth={auth}
          signUpUserInfo={signUpUserInfo}
          setSignUpUserInfo={setSignUpUserInfo}
        />
        {openSignup && (
          <Signup
            authState={openSignup}
            setAuthState={setOpenSignup}
            setSignUpUserInfo={setSignUpUserInfo}
            signUpUserInfo={signUpUserInfo}
            auth={auth}
          />
        )}
      </div>
    </>
  );
};
export default page;
