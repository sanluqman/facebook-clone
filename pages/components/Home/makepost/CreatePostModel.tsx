import { firestore, storage } from "@/pages/firebase";
import { signUpUserInfoTypes } from "@/pages/types/authtype";
import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import router from "next/router";
import { title } from "process";
import React, { useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

type CreatePostModelProps = {
  openPostModel: boolean;
  setOpenPostModel: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: signUpUserInfoTypes;
  user: User;
  storage: any;
};

const CreatePostModel: React.FC<CreatePostModelProps> = ({
  openPostModel,
  setOpenPostModel,
  userInfo,
  user,
  storage,
}) => {
  const [selectedText, setSelectedText] = useState("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const selectFileRef = useRef<HTMLInputElement>(null);

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };
  const userProfileImage = userInfo.profileimg;
  const profileName = `${userInfo.firstName}  ${userInfo.lastName}`;

  const handleCreatePost = async () => {
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        profilrImageUrl: userProfileImage || "",
        profileName,
        createdAt: serverTimestamp(),
        title: selectedText,
        numberOfComments: 0,
        numberOfLikes: 0,
        editedAt: serverTimestamp(),
        creatorId: user.uid,
      });

      console.log("HERE IS NEW POST ID", postDocRef.id);
      // // check if selectedFile exists, if it does, do image processing
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
        console.log("HERE IS DOWNLOAD URL", downloadURL);
      }
    } catch (error) {
      console.log("createPost error", error);
    }
    setOpenPostModel((prev) => !prev);
  };

  return (
    <div className="fixed z-50 p-4 overflow-x-hidden overflow-y-hidden ml-auto mr-auto top-10 w-[500px] h-[500px] bg-white ">
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative rounded-lg shadow  w-full h-full">
          <div className="text-center mt-4 text-xl font-bold">
            <h1 className="">Create post</h1>
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setOpenPostModel((prev) => !prev)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="w-full h-[2px] bg-gray-300 mt-4 mb-4"></div>
          {/* //!!! */}
          <div className="flex">
            <div className="flex align-middle justify-center">
              {userInfo.profileimg ? (
                <img src={userInfo.profileimg} className="h-9 w-9 mr-2 mt-1" />
              ) : (
                <CgProfile className="text-4xl mr-2 mt-1" />
              )}
              <h1 className="font-semibold">{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
            </div>
          </div>
          <div className="">
            <input
              type="text"
              className=" rounded-2xl w-full p-2 text-base outline-none border-none "
              placeholder={`What is on your mind, ${userInfo.firstName}`}
              onChange={(e) => setSelectedText(e.target.value)}
              value={selectedText}
            ></input>
          </div>
          <div className="w-full h-[180px]  rounded-lg border-2 relative flex justify-center align-middle flex-col">
            <button
              className="absolute right-0 top-0 mr-2 text-xl font-semibold cursor-pointer hover:bg-slate-300 rounded-full p-1 w-10 h-10"
              onClick={() => setSelectedFile("")}
            >
              x
            </button>
            {selectedFile ? (
              <img src={selectedFile} />
            ) : (
              <>
                <div className="ml-auto mr-auto">
                  <button
                    className="text-3xl rounded-full bg-[#d6d8da] p-2"
                    onClick={() => selectFileRef.current?.click()}
                  >
                    <BiImageAdd />
                  </button>
                </div>
                <h1 className="text-center font-semibold">Add photos/videos</h1>
                <p className="text-xs text-center">or drag and drop</p>
                <input
                  type="file"
                  className="hidden"
                  ref={selectFileRef}
                  onChange={onSelectImage}
                />
              </>
            )}
          </div>

          <div className="">
            <button
              onClick={handleCreatePost}
              className="w-full p-2 text-center bg-[#F0F2F5] mt-4 hover:bg-[#c0c2c5] rounded-lg"
            >
              post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePostModel;
