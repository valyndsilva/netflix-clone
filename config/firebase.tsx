// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import  firebaseConfig  from "./firebase.config";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();

export default app;
export { auth, db };
