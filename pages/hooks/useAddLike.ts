import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  query,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  increment,
  addDoc,
} from "firebase/firestore";
import { auth, firestore } from "../firebase";

export default async function addLike(postid: string, useruid: string) {
  // geting refrense
  const getingPostQuery = query(
    collection(firestore, "users", useruid, "likes")
  );
  // get data
  const querySnapshot = await getDocs(getingPostQuery);

  let post: any;
  querySnapshot.forEach((doc) => {
    post = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });

  let likedpostid;
  if (post) {
    post.filter((likedPost: any) => {
      if (likedPost.likedPost === postid) {
        likedpostid = likedPost;
      }
    });
  }

  const updateDocRef = doc(firestore, "posts", postid);

  if (likedpostid) {
    // delete likes
    const deleteDocRef = doc(
      firestore,
      `users/${useruid}/likes`,
      likedpostid.id
    );

    deleteDoc(deleteDocRef).then(() => {
      console.log("deleted");
    });

    updateDoc(updateDocRef, {
      numberOfLikes: increment(-1),
    }).then(() => {
      console.log("remove like");
    });
  } else {
    // add likes
    await addDoc(collection(firestore, "users", useruid, "likes"), {
      likedPost: postid,
    });

    updateDoc(updateDocRef, {
      numberOfLikes: increment(1),
    }).then(() => {
      console.log("updated");
    });
  }
}
