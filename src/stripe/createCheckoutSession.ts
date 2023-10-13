import { firestore } from "@/firebase/config/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  DocumentSnapshot,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import getStripe from "./initializeStripe";

export async function createCheckoutSession(uid: string) {
  // Create a new checkout session in the subollection inside this users document
  // replace the price_XXX value with the correct value from your product in stripe.
  const checkoutSessionRef = await addDoc(
    collection(firestore, "users", uid, "checkout_sessions"),
    {
      price: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_PRICE_PREMIUM,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  // Wait for the CheckoutSession to get attached by the extension
  const docRef = doc(
    firestore,
    "users",
    uid,
    "checkout_sessions",
    checkoutSessionRef.id
  );
  const unsubscribe = onSnapshot(
    docRef,
    async (doc: DocumentSnapshot<DocumentData>) => {
      const { sessionId } = doc.data()!;
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await getStripe();
        stripe!.redirectToCheckout({ sessionId });
        unsubscribe();
      }
    }
  );
}
