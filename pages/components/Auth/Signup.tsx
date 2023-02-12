import React, { useEffect, useState } from "react";
import Authinputs from "./Authinputs";
import Birthdayinputs from "./Birthdayinputs";
import Genderinput from "./Genderinput";
import Terms from "./Terms";
import { signUpUserInfoTypes } from "./authtype";
import { Auth } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

type SignupProps = {
  authState: boolean;
  setAuthState: React.Dispatch<React.SetStateAction<boolean>>;
  setSignUpUserInfo: React.Dispatch<React.SetStateAction<signUpUserInfoTypes>>;
  signUpUserInfo: signUpUserInfoTypes;
  auth: Auth;
};

const Signup: React.FC<SignupProps> = ({
  setAuthState,
  setSignUpUserInfo,
  signUpUserInfo,
  auth,
}) => {
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const success = await createUserWithEmailAndPassword(email, password);

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      const success = !!setDoc(
        doc(firestore, "users", user!.user.uid),
        signUpUserInfo
      );

      if (success) {
        router.push("/");
      }
    }
  }, [user]);

  return (
    <div className="relative top-[-90%] ml-auto mr-auto w-[430px] bg-white shadow-lg h-[550px] rounded-lg">
      <div className="flex justify-between align-middle px-3 py-1">
        <div className="">
          <h1 className="font-bold text-3xl">Sign Up</h1>
          <h1 className="text-gray-400">It’s quick and easy. </h1>
        </div>
        <div
          className="text-2xl font-bold text-gray-300"
          onClick={() => setAuthState((prev) => !prev)}
        >
          X
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-300 "></div>
      <Authinputs
        setSignUpUserInfo={setSignUpUserInfo}
        signUpUserInfo={signUpUserInfo}
        setEmail={setEmail}
        email={email}
        setPassword={setPassword}
        password={password}
      />
      <Birthdayinputs
        setSignUpUserInfo={setSignUpUserInfo}
        signUpUserInfo={signUpUserInfo}
      />
      <Genderinput
        setSignUpUserInfo={setSignUpUserInfo}
        signUpUserInfo={signUpUserInfo}
      />
      <Terms />
      <div className="flex justify-center align-middle">
        <button className="bg-[#5bb149] rounded-md py-2 px-8 " onClick={signup}>
          Sign up
        </button>
      </div>
    </div>
  );
};
export default Signup;
