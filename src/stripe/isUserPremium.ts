import { auth } from "@/firebase/config/firebaseConfig";

export default async function isUserPremium(): Promise<boolean> {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();

  return decodedToken?.claims?.stripeRole ? true : false;
}
