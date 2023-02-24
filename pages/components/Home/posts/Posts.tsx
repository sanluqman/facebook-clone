import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  Timestamp,
  orderBy,
  limit,
} from "firebase/firestore";
import { CgProfile } from "react-icons/cg";
import { GrLike } from "react-icons/gr";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import { User } from "firebase/auth";
import Addcomment from "../comment/Addcomment";
import moment from "moment";
import Allcommentsmodel from "../comment/Allcommentsmodel";
import addLike from "@/pages/hooks/useAddLike";

type PostsProps = {
  firestore: any;
  user: User;
};

type postType = [
  {
    id: string;
    profilrImageUrl: string;
    profileName: string;
    createdAt: Timestamp;
    title: string;
    numberOfComments: number;
    numberOfLikes: number;
    editedAt: Timestamp;
    creatorId: string;
    imageURL: string;
  }
];

const Posts: React.FC<PostsProps> = ({ firestore, user }) => {
  const [posts, setPosts] = useState<postType | null>(null);
  const [openCommentsModel, setOpenCommentsModel] = useState(false);
  const [userName, setUserName] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [postid, setPostid] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [numberOfComments, setNumberOfComments] = useState(0);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  const openingCommentDetailModel = (
    postUserName: string,
    postImage: string,
    postid: string,
    userProfile: string,
    numberOfComments: number,
    numberOfLikes: number
  ) => {
    setUserName(postUserName);
    setPostUrl(postImage);
    setPostid(postid);
    setUserProfile(userProfile);
    setNumberOfComments(numberOfComments);
    setNumberOfLikes(numberOfLikes);

    setOpenCommentsModel((prev) => !prev);
  };

  const getHomePagePosts = async () => {
    const getingPostQuery = query(
      collection(firestore, "posts"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const querySnapshot = await getDocs(getingPostQuery);
    let post;
    querySnapshot.forEach((doc) => {
      post = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    if (post) {
      setPosts(post);
    }
  };

  useEffect(() => {
    getHomePagePosts();
  }, []);
  return (
    <div className="mb-14">
      {posts &&
        posts.map((post) => {
          return (
            <div
              className="flex flex-col mb-3 mt-3 bg-white rounded-lg p-3 "
              key={post.id}
            >
              <div className="flex justify-between">
                <div className="flex">
                  {post.profilrImageUrl ? (
                    <img
                      src={post.profilrImageUrl}
                      className="h-9 w-9 mr-2 mt-1"
                    />
                  ) : (
                    <CgProfile className="text-4xl mr-2 mt-1" />
                  )}
                  <div className="flex flex-col">
                    <h1 className="font-semibold">{post.profileName}</h1>
                    <h1 className="text-gray-400 text-sm">
                      {moment(
                        new Date(post.createdAt.seconds * 1000)
                      ).fromNow()}
                    </h1>
                  </div>
                </div>

                <div className="flex text-gray-400 align-middle justify-center">
                  <div className="pr-1">...</div>
                  <div className="pl-1 text-2xl font-light">x</div>
                </div>
              </div>
              {/* //!! description */}
              <div className="pt-3 pb-3">
                <p>{post.title}</p>
              </div>
              <div className="">
                <img src={post.imageURL} className="w-full" />
              </div>
              <div className="flex justify-between align-middle p-3">
                <h1>{post.numberOfLikes} Likes</h1>
                <div
                  className="flex "
                  onClick={() =>
                    openingCommentDetailModel(
                      post.profileName,
                      post.imageURL,
                      post.id,
                      post.profilrImageUrl,
                      post.numberOfComments,
                      post.numberOfLikes
                    )
                  }
                >
                  <h1>{post.numberOfComments}</h1>{" "}
                  <h1>
                    <GoComment className="text-xl pt-1 pl-1" />
                  </h1>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
              <div className="flex justify-around text-gray-500">
                <div
                  className=" flex "
                  onClick={() => addLike(post.id, user.uid)}
                >
                  <GrLike className="text-xl pr-1" /> like
                </div>
                <div className=" flex ">
                  <GoComment className="text-xl pr-1 pt-1" /> comment
                </div>
                <div className=" flex ">
                  <RiShareForwardLine className="text-xl pr-1" /> share
                </div>
              </div>
              <div className="m-3 ">
                <h1
                  onClick={() =>
                    openingCommentDetailModel(
                      post.profileName,
                      post.imageURL,
                      post.id,
                      post.profilrImageUrl,
                      post.numberOfComments,
                      post.numberOfLikes
                    )
                  }
                >
                  view more comments
                </h1>
                <Addcomment
                  userProfileImg={post.profilrImageUrl}
                  userName={post.profileName}
                  postid={post.id}
                  userProfile={userProfile}
                />
              </div>
            </div>
          );
        })}
      {openCommentsModel && (
        <Allcommentsmodel
          userName={userName}
          setOpenCommentsModel={setOpenCommentsModel}
          postUrl={postUrl}
          postid={postid}
          userProfile={userProfile}
          numberOfComments={numberOfComments}
          numberOfLikes={numberOfLikes}
          useruid={user.uid}
        />
      )}
    </div>
  );
};
export default Posts;

{
  /* <Text color="gray.500">
                Posted by u/{post.userDisplayText}{" "}
                {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
              </Text> */
}
