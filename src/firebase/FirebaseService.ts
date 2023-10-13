import { auth, firestore } from "./config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

export const CreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  await updateProfile(user, {
    displayName: displayName,
  });

  await setDoc(doc(firestore, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    provider: user.providerData[0].providerId,
    createdAt: new Date(),
  });

  await sendEmailVerification(user);
  return user;
};

export const SendEmailVerification = async (
  email: string,
  password: string
) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(response?.user);
  await auth.signOut();
};

export const SendPasswordResetEmail = async (email: string) => {
  const response = await sendPasswordResetEmail(auth, email);
  return response;
};

export const SignInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};

export const SignOut = async () => {
  const response = await auth.signOut();
  return response;
};

export const AuthStateListener = async () => {
  return await new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

export const GetCurrentUser = () => {
  return auth.currentUser;
};
