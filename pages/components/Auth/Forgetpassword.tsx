import { Auth } from "firebase/auth";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { signUpUserInfoTypes } from "../../types/authtype";

type ForgetpasswordProps = {
  openModel: boolean;
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
  auth: Auth;
  signUpUserInfo: signUpUserInfoTypes;
  setSignUpUserInfo: React.Dispatch<React.SetStateAction<signUpUserInfoTypes>>;
};

const Forgetpassword: React.FC<ForgetpasswordProps> = ({
  openModel,
  setOpenModel,
  auth,
  signUpUserInfo,
  setSignUpUserInfo,
}) => {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const forgetpassword = async () => {
    console.log("run");
    const success = await sendPasswordResetEmail(email);
    if (success) {
      alert("Sent email");
    }
    if (error) {
      console.log(error);
    }
    if (!success) {
      console.log(error);
    }
  };

  const closeModelAndResetEmail = () => {
    setOpenModel((prev) => !prev);
    setSignUpUserInfo({
      ...signUpUserInfo,
      email: "",
    });
  };

  return (
    <>
      <div className="ml-[30%] mt-[5%] fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full  ">
        <div className="relative w-[500px] h-[280px] max-w-2xl md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white  shadow-xl rounded-lg  ">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Find your account
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setOpenModel((prev) => !prev)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6 flex justify-center flex-col">
              <h1>Please enter your email to forget your password account.</h1>
              <input
                type="text"
                className="p-2 bg-white rounded-md m-1 shadow-xl border-spacing-1 border-gray-600 w-full"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center justify-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={forgetpassword}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                submit
              </button>
              <button
                onClick={closeModelAndResetEmail}
                data-modal-hide="staticModal"
                type="button"
                className=" bg-[#c9cccf] hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 text-black "
              >
                Cancle
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Forgetpassword;
