import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";
import { getFunctions, httpsCallable } from "@firebase/functions";
import app from "../config/firebaseClient";

//  getStripePayments: Serves as the main entry point to this library. Initializes the client SDK, and returns a handle object that can be passed into other APIs.
const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

// createCheckoutSession: Creates a new Stripe checkout session with the given parameters. Returned session contains a session ID and a session URL that can be used to redirect the user to complete the checkout. User must be currently signed in with Firebase Auth to call this API. If a timeout occurs while waiting for the session to be created and acknowledged by Stripe, rejects with a deadline-exceeded error. Default timeout duration is
const loadCheckout = async (priceId: string) => {
  await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message));
};

const goToBillingPortal = async () => {
  const instance = getFunctions(app, "europe-west2");
  const functionRef = httpsCallable(
    instance,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  await functionRef({
    returnUrl: `${window.location.origin}/account`,
  })
    .then(({ data }: any) => window.location.assign(data.url))
    .catch((error) => console.log(error.message));
};

export { loadCheckout, goToBillingPortal };
export default payments;
