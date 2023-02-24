import {
  addDoc,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";

export default async function addComment(
  commentText: string,
  postid: string,
  userName: string,
  userProfile: string
) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(firestore, "comments"), {
    comment: commentText,
    postid,
    userName,
    userProfile,
    createdAt: serverTimestamp(),
  });
  console.log("Document written with ID: ", docRef.id);

  const updateDocRef = doc(firestore, "posts", `${postid}`);

  updateDoc(updateDocRef, {
    numberOfComments: increment(1),
  }).then(() => {
    console.log("updated number Of Comments");
  });
}
