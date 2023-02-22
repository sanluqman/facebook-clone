import React from "react";
import { GetServerSideProps } from "next";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";

type indexProps = {
  singlePageUserData: unknown;
};

const index: React.FC<indexProps> = ({ singlePageUserData }) => {
  if (!singlePageUserData) {
    return <h1>no user</h1>;
  }

  return <div>Have a good coding</div>;
};
export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userid = context.query.profileid as string;

  const docRef = doc(firestore, "users", `${userid}`);
  const docSnap = await getDoc(docRef);
  let singlePageUserData;

  if (docSnap.exists()) {
    singlePageUserData = docSnap.data();
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
