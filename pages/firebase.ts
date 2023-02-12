import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAeX_-wGaVUowQAG_LOsQGDtZpGQD_OM6M",
  authDomain: "facebook-c3292.firebaseapp.com",
  projectId: "facebook-c3292",
  storageBucket: "facebook-c3292.appspot.com",
  messagingSenderId: "173087520902",
  appId: "1:173087520902:web:d49134ad30e1ed498ff907",
  measurementId: "G-21WF33HQDR",
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export { app, auth, firestore, storage };
