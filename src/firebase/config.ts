import { enviroments } from "../env";

const firebaseConfig = {
  apiKey: enviroments.FIREBASE_API_KEY,
  authDomain: enviroments.FIREBASE_AUTH_DOMAIN,
  projectId: enviroments.FIREBASE_PROJECT_ID,
  storageBucket: enviroments.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: enviroments.FIREBASE_MESSAGING_SENDER_ID,
  appId: enviroments.FIREBASE_APP_ID,
};

export default firebaseConfig;
