import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG
  ? JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
  : undefined;

const firebaseApp = initializeApp(firebaseConfig);

if (!getApp()) {
  firebaseApp;
}

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
