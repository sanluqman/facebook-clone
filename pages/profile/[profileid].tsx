import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { auth, firestore } from "../firebase";
import ProfileImage from "../components/userDetail/ProfileImage";
import Intro from "../components/userDetail/Intro";
import Photos from "../components/userDetail/Photos";
import Friends from "../components/userDetail/Friends";
import Posts from "../components/userDetail/Posts";
import { useAuthState } from "react-firebase-hooks/auth";

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
} & DocumentData;

type friendidtype = {
  friendProfileImg: string;
  friendid: string;
  friendname: string;
  id: string;
};

type indexProps = {
  singlePageUserData: singlePageUserDataType;
};

const index: React.FC<indexProps> = ({ singlePageUserData }) => {
  const [friendid, setFriendid] = useState<friendidtype | null>(null);
  const userfullname = `${
    (singlePageUserData[1] as singlePageUserDataType).firstName
  } ${(singlePageUserData[1] as singlePageUserDataType).lastName}`;

  const [user] = useAuthState(auth);
  if (!singlePageUserData) {
    return <h1>no user</h1>;
  }

  const checkifFriend = async () => {
    const getingPostQuery = query(
      collection(firestore, "users", user!.uid, "friends")
    );
    // get data
    const querySnapshot = await getDocs(getingPostQuery);

    let friend: any;
    querySnapshot.forEach((doc) => {
      friend = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    if (friend) {
      friend.filter((fid: any) => {
        if (fid.friendid === singlePageUserData[0]) {
          setFriendid(fid);
        }
      });
    }
  };

  useEffect(() => {
    if (user) {
      checkifFriend();
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      <ProfileImage
        coverimg={singlePageUserData[1].coverimg}
        profileimg={singlePageUserData[1].profileimg}
        username={userfullname}
        userid={singlePageUserData[0]}
        ifAdded={!!friendid}
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
