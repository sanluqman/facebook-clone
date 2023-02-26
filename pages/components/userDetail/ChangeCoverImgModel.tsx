import { auth, firestore, storage } from "@/pages/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiImageAdd } from "react-icons/bi";

type ChangeCoverModelProps = {
  changeCover: boolean;
  setChangeCover: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChangeCoverModel: React.FC<ChangeCoverModelProps> = ({
  changeCover,
  setChangeCover,
}) => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const selectFileRef = useRef<HTMLInputElement>(null);

  const [user] = useAuthState(auth);

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

  const onChangeImage = async () => {
    const userCoverImageRef = doc(firestore, "users", `${user!.uid}`);

    const imageRef = ref(storage, `profiles/${user!.uid}/coverimage`);
    await uploadString(imageRef, selectedFile, "data_url");
    const downloadURL = await getDownloadURL(imageRef);

    updateDoc(userCoverImageRef, {
      coverimg: downloadURL,
    }).then(() => {
      console.log("changed");
      setChangeCover((prev) => !prev);
    });
  };

  return (
    <div className="rel bg-gray-100 rounded-lg shadow-2xl w-[500px] h-[400px] absolute top-0 mx-auto left-0 right-0 my-auto bottom-0">
      <button
        onClick={() => setChangeCover((prev) => !prev)}
        className="absolute right-4 top-0 text-3xl"
      >
        x
      </button>
      <div className="w-full h-[180px]  rounded-lg border-2 relative flex justify-center align-middle flex-col mt-20">
        <button
          className="absolute right-0 top-0 mr-2 text-xl font-semibold cursor-pointer 
          hover:bg-slate-300 rounded-full p-1 w-10 h-10"
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
      <div className="flex w-full justify-center">
        <button
          className="  p-2 text-center mt-5 bg-gray-400 rounded-xl"
          onClick={() => onChangeImage()}
        >
          add image
        </button>
      </div>
    </div>
  );
};
export default ChangeCoverModel;
