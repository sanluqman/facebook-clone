import React from "react";
import { signUpUserInfoTypes } from "./authtype";
import { AuthinputsProps } from "./authtype";

type emailandpassword = {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
};

const Authinputs: React.FC<AuthinputsProps & emailandpassword> = ({
  setSignUpUserInfo,
  signUpUserInfo,
  setEmail,
  email,
  setPassword,
  password,
}) => {
  console.log(email, password);

  return (
    <div>
      <div className="px-3 py-1 flex flex-col">
        <div className=" flex">
          <input
            type="text"
            placeholder="First Name"
            className="p-2 w-1/2 bg-[#F5F6F7] rounded-md m-1"
            value={signUpUserInfo.firstName}
            onChange={(e) =>
              setSignUpUserInfo({
                ...signUpUserInfo,
                firstName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-2 w-1/2 bg-[#F5F6F7] rounded-md m-1"
            value={signUpUserInfo.lastName}
            onChange={(e) =>
              setSignUpUserInfo({
                ...signUpUserInfo,
                lastName: e.target.value,
              })
            }
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="p-2 w-full bg-[#F5F6F7] rounded-md m-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="New password"
          className="p-2 w-full bg-[#F5F6F7] rounded-md m-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
};
export default Authinputs;
