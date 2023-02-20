import { firestore } from "@/pages/firebase";
import {
  Timestamp,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GoComment } from "react-icons/go";
import { GrLike } from "react-icons/gr";
import { RiShareForwardLine } from "react-icons/ri";

type AllcommentsmodelProps = {
  userName: string;
  setOpenCommentsModel: React.Dispatch<React.SetStateAction<boolean>>;
  postUrl: string;
  postid: string;
};

type commentsType = [
  {
    comment: string;
    id: string;
    postid: string;
    userName: string;
    userProfile: string;
    createdAt: Timestamp;
  }
];

const Allcommentsmodel: React.FC<AllcommentsmodelProps> = ({
  userName,
  setOpenCommentsModel,
  postUrl,
  postid,
}) => {
  const [comments, setComments] = useState<commentsType | null>(null);
  const getPostComments = async () => {
    console.log("here");
    const getingCommentQuery = query(
      collection(firestore, "comments"),
      where("postid", "==", postid),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(getingCommentQuery);
    let comment;
    querySnapshot.forEach((doc) => {
      comment = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

    if (comment) {
      setComments(comment);
    }
  };
  useEffect(() => {
    console.log("runing");
    getPostComments();
  }, [postid]);

  return (
    <>
      {/* <!-- Main modal --> */}
      <div className="fixed top-10 left-[25%] right-[25%] z-50 rounded-lg  overflow-y-auto w-[700px] h-[550px] shadow-2xl">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg  w-full h-full overflow-y-auto">
          {/* <!-- Modal header --> */}
          <div className="flex  p-4 relative ">
            <h1 className="w-full text-center text-xl font-medium">
              {userName && userName}
            </h1>
            <div className="bg-[#cacdd1] rounded-full w-10 h-10 ">
              <button
                className="absolute top-4 right-5 text-2xl pr-[9px]"
                onClick={() => setOpenCommentsModel((prev) => !prev)}
              >
                x
              </button>
            </div>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6 flex flex-col">
            <div className="">
              <img src={postUrl} className="w-full " />
            </div>
            <div className="flex justify-between align-middle p-3">
              <h1>Likes</h1>
              <div className="flex ">
                <h1>0 comments</h1>
              </div>
            </div>
            <div className="flex justify-around text-gray-500">
              <div className=" flex ">
                <GrLike className="text-xl pr-1" /> like
              </div>
              <div className=" flex ">
                <GoComment className="text-xl pr-1 pt-1" /> comment
              </div>
              <div className=" flex ">
                <RiShareForwardLine className="text-xl pr-1" /> share
              </div>
            </div>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <div className=" mb-10">
              {comments &&
                comments.map((comment) => {
                  return (
                    <div className="flex mb-2 ">
                      {comment.userProfile ? (
                        <img
                          src={comment.userProfile}
                          className="h-9 w-9 mr-2 mt-1"
                        />
                      ) : (
                        <CgProfile className="text-4xl mr-2 mt-1" />
                      )}
                      <div className="flex flex-col bg-[#F0F2F5] rounded-lg py-1 px-3">
                        <h1>{comment.userName}</h1>
                        <h1>{comment.comment}</h1>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Allcommentsmodel;
