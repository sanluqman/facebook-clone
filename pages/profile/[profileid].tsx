import React from "react";
import { GetServerSideProps } from "next";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import ProfileImage from "../components/userDetail/ProfileImage";
import Intro from "../components/userDetail/intro";
import Photos from "../components/userDetail/photos";
import Friends from "../components/userDetail/Friends";
import Posts from "../components/userDetail/Posts";

type singlePageUserDataType = {
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

type indexProps = {
  singlePageUserData: singlePageUserDataType;
};

const index: React.FC<indexProps> = ({ singlePageUserData }) => {
  if (!singlePageUserData) {
    return <h1>no user</h1>;
  }
  const userfullname = `${singlePageUserData[1].firstName} ${singlePageUserData[1].lastName}`;
  return (
    <div className="flex flex-col">
      <ProfileImage
        coverimg={singlePageUserData[1].coverimg}
        profileimg={singlePageUserData[1].profileimg}
        username={userfullname}
        userid={singlePageUserData[0]}
      />
      <div className="flex">
        <div className="flex flex-col">
          <Intro />
          <Photos />
          <Friends />
        </div>
        <Posts />
      </div>
    </div>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userid = context.query.profileid as string;

  const docRef = doc(firestore, "users", `${userid}`);
  const docSnap = await getDoc(docRef);
  let singlePageUserData;

  if (docSnap.exists()) {
    singlePageUserData = [docSnap.id, docSnap.data()];
  } else {
    // doc.data() will be undefined in this case
    singlePageUserData = null;
  }

  return {
    props: {
      singlePageUserData,
    }, // will be passed to the page component as props
  };
};
