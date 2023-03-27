// // firebaseAdmin.ts

// import firebaseAdmin from "firebase-admin";

// // get this JSON from the Firebase board
// // you can also store the values in environment variables

// const privateKey = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY;
// const clientEmail = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL;
// const projectId = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID;

// if (!privateKey || !clientEmail || !projectId) {
//   console.log(
//     `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
//   );
// }

// if (!firebaseAdmin.apps.length) {
//   firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert({
//       privateKey: privateKey,
//       clientEmail: clientEmail,
//       projectId: projectId,
//     }),
//     databaseURL: `https://${projectId}.firebaseio.com`,
//   });
// }

// export { firebaseAdmin };

import * as firebaseAdmin from "firebase-admin";

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from "../json/firebase-admin-sdk-service-account-key.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: `https://${serviceAccount.project_id}.europe-west1.firebasedatabase.app`,
  });
}

export { firebaseAdmin };
