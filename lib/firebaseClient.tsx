// Import the functions you need from the SDKs you need
import * as firebaseClient from "firebase/app";
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  // signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  // setPersistence,
  // browserSessionPersistence,
} from "firebase/auth";
import {
  getFirestore,
  // query,
  // getDocs,
  collection,
  // where,
  addDoc,
} from "firebase/firestore";
import Error from "next/error";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  appId: process.env.NEXT_PUBLIC_FIREBASE__APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// if (typeof window !== "undefined" && !firebaseClient.apps.length) {
//   app;
//   setPersistence(auth, browserSessionPersistence);
// }

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // console.log(`User ${user.displayName} logged in successfully!`);
  } catch (err: any) {
    console.error(err);
    alert(`User not found! Please register to login: ${err.message}`);
  }
};
const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    updateProfile(auth.currentUser!, {
      displayName: name,
      photoURL: String(Math.floor(Math.random() * 5) + 1),
    });
    console.log(`User ${user.displayName} registered successfully!`);
    await addDoc(collection(db, "users"), {
      authProvider: "local",
      uid: user.uid,
      name,
      email,
      displayName: name,
      photoURL: Math.floor(Math.random() * 5) + 1,
    });
    console.log(`Document added successfully!`);
    return user;
  } catch (err) {
    console.error(err);
  }
};
const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (error) {
    return error;
  }
};
const logOut = () => {
  signOut(auth);
};
export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logOut,
  firebaseClient,
};
export default app;
