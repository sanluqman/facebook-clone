export type signUpUserInfoTypes = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  months: string;
  days: string;
  year: string;
  gender: string;
};

export type AuthinputsProps = {
  setSignUpUserInfo: React.Dispatch<React.SetStateAction<signUpUserInfoTypes>>;
  signUpUserInfo: signUpUserInfoTypes;
};
