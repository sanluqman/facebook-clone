import React from "react";
import { AuthinputsProps } from "./authtype";

const Genderinput: React.FC<AuthinputsProps> = ({
  setSignUpUserInfo,
  signUpUserInfo,
}) => {
  return (
    <div>
      <div className="px-3 py-1">
        <h1 className="pl-3 text-gray-400">Gender</h1>
        <form className="p-3 flex justify-around">
          <label
            htmlFor="femail"
            className="w-[120px] h-[35px] bg-[#F5F6F7] rounded-md p-2 border-gray-400 text-sm flex justify-between border-spacing-1"
          >
            Femail
            <input
              type="radio"
              name="gender"
              id="femail"
              value="femail"
              onChange={(e) =>
                setSignUpUserInfo({
                  ...signUpUserInfo,
                  gender: e.target.value,
                })
              }
            />
          </label>
          <label
            htmlFor="mail"
            className="w-[120px] h-[35px] bg-[#F5F6F7] rounded-md p-2 border-gray-400 text-sm flex justify-between border-spacing-1"
          >
            Mail
            <input
              type="radio"
              name="gender"
              value="mail"
              id="mail"
              onChange={(e) =>
                setSignUpUserInfo({
                  ...signUpUserInfo,
                  gender: e.target.value,
                })
              }
            />
          </label>
          <label
            htmlFor="costom"
            className="w-[120px] h-[35px] bg-[#F5F6F7] rounded-md p-2 border-gray-400 text-sm flex justify-between border-spacing-1"
          >
            Costom
            <input
              type="radio"
              name="gender"
              value="costom"
              id="costom"
              onChange={(e) =>
                setSignUpUserInfo({
                  ...signUpUserInfo,
                  gender: e.target.value,
                })
              }
            />
          </label>
        </form>
      </div>
    </div>
  );
};
export default Genderinput;
