import { auth, firestore } from "@/pages/firebase";
import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CgProfile } from "react-icons/cg";
import { Context } from "vm";

type Home_rightProps = {};

type allUserFriendtype = [
  {
    friendProfileImg: string;
    friendid: string;
    friendname: string;
  }
];

const Home_right: React.FC<Home_rightProps> = () => {
  const [allFriends, setAllFriends] = useState<allUserFriendtype | null>(null);
  const [user] = useAuthState(auth);
  const getUserFriends = async () => {
    const getingFriendsQuery = query(
      collection(firestore, "users", `${user!.uid}`, "friends")
    );

    const querySnapshot = await getDocs(getingFriendsQuery);
    let friend;
    querySnapshot.forEach((doc) => {
      friend = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
    if (friend) {
      setAllFriends(friend);
    }
  };

  useEffect(() => {
    if (user) {
      getUserFriends();
    }
  }, [user]);

  return (
    <div className="w-full ">
      <div className="flex flex-col p-3">
        {allFriends &&
          allFriends.map((friend) => {
            return (
              <Link
                href={`profile/${friend.friendid}`}
                className="flex  justify-start items-center mx-5 my-1"
              >
                {friend.friendProfileImg ? (
                  <img
                    src={friend.friendProfileImg}
                    className="h-9 w-9 mr-2 mt-1"
                  />
                ) : (
                  <CgProfile className="text-4xl mr-2 mt-1" />
                )}
                <h1>{friend.friendname}</h1>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
export default Home_right;
