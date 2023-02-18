import React, { useEffect, useState } from "react";
import { Auth } from "firebase/auth";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { signUpUserInfoTypes } from "../../types/authtype";
import { useRouter } from "next/router";
import Forgetpassword from "./Forgetpassword";

type SigninProps = {
  authState: boolean;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
  auth: Auth;
  signUpUserInfo: signUpUserInfoTypes;
  setSignUpUserInfo: React.Dispatch<React.SetStateAction<signUpUserInfoTypes>>;
};

const Signin: React.FC<SigninProps> = ({
  authState,
  setAuthState,
  auth,
  signUpUserInfo,
  setSignUpUserInfo,
}) => {
  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [openModel, setOpenModel] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const signin = () => {
    signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex bg-[#F0F2F5] justify-around align-middle h-full ">
      <div className="flex justify-center align-middle flex-col">
        <h1 className="text-6xl text-[#1877F2] font-bold">Facebook</h1>
        <h2 className="text-3xl">
          Connect with friends and the world <hr /> around you on Facebook.
        </h2>
      </div>
      <div className="flex justify-between flex-col bg-white shadow-lg h-[350px] w-[350px] mt-32 rounded-lg p-3 ">
        <input
          type="text"
          placeholder="Email"
          className="p-3"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-3 bg-[#1877F2] text-center text-white rounded-md"
          onClick={signin}
        >
          login
        </button>
        <h1
          className="text-center text-sm text-[#1877F2]"
          onClick={() => setOpenModel((prev) => !prev)}
        >
          forget password
        </h1>
        {openModel && (
          <Forgetpassword
            openModel={openModel}
            setOpenModel={setOpenModel}
            auth={auth}
            signUpUserInfo={signUpUserInfo}
            setSignUpUserInfo={setSignUpUserInfo}
          />
        )}
        <div className="h-[1px] w-full bg-gray-300"></div>
        <button
          className="p-3 w-2/3 ml-auto mr-auto rounded-md bg-[#36A420] text-white text-lg"
          onClick={() => setAuthState((prev) => !prev)}
        >
          create new account
        </button>
      </div>
    </div>
  );
};
export default Signin;
