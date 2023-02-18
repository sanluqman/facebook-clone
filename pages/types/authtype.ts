export type signUpUserInfoTypes = {
  firstName: string;
  lastName: string;
  months: string;
  days: string;
  year: string;
  gender: string;
  friendsNumber: number;
  profileimg: string;
  coverimg: string;
};

export type AuthinputsProps = {
  setSignUpUserInfo: React.Dispatch<React.SetStateAction<signUpUserInfoTypes>>;
  signUpUserInfo: signUpUserInfoTypes;
};
