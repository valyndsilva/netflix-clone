// Import the functions you need from the SDKs you need
// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { getApp as _getApp, getApps, initializeApp } from "firebase/app";
import { getAuth as _getAuth } from "firebase/auth";
import {
  enableIndexedDbPersistence,
  getFirestore as _getFirestore,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE__APP_ID,
};

const firebaseIsRunning = () => !!getApps().length;

export function getApp() {
  if (!firebaseIsRunning()) initializeApp(firebaseConfig);

  return _getApp();
}

export function getFirestore() {
  const isRunning = firebaseIsRunning();
  if (!isRunning) getApp();

  const db = _getFirestore();

  if (!isRunning)
    if (typeof window !== undefined) enableIndexedDbPersistence(db);

  return db;
}

export function getAuth() {
  if (!firebaseIsRunning()) getApp();
  return _getAuth();
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export { auth, db };
export default app;
