import addComment from "@/pages/hooks/useAddComment";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

type AddcommentProps = {
  userProfileImg: string;
  userName: string;
  postid: string;
  userProfile: string;
};

const Addcomment: React.FC<AddcommentProps> = ({
  userProfileImg,
  userName,
  postid,
  userProfile,
}) => {
  const [commentText, setCommentText] = useState("");
  return (
    <div className="flex">
      {userProfileImg ? (
        <img src={userProfileImg} className="h-9 w-9 mr-2 mt-1" />
      ) : (
        <CgProfile className="text-4xl mr-2 mt-1" />
      )}
      <div className="relative w-full bg-[#F0F2F5] rounded-3xl">
        <input
          type="text"
          className="rounded-3xl p-1 w-full bg-transparent outline-none boreder-none ml-2 mt-1"
          placeholder="Write a comment..."
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
        <button
          className="absolute top-[6px] right-3 bg-transparent"
          onClick={() => addComment(commentText, postid, userName, userProfile)}
        >
          send
        </button>
      </div>
    </div>
  );
};
export default Addcomment;
