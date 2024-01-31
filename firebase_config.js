import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBoH_YunnFhQIMpuVVqdDlanr8UvRtpY1k",
  authDomain: "bullishmarketcap-ffbe0.firebaseapp.com",
  projectId: "bullishmarketcap-ffbe0",
  storageBucket: "bullishmarketcap-ffbe0.appspot.com",
  messagingSenderId: "995910038694",
  appId: "1:995910038694:web:c70bd904e6c12740783067",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

//  apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,

// apiKey: "AIzaSyBoH_YunnFhQIMpuVVqdDlanr8UvRtpY1k",
// authDomain: "bullishmarketcap-ffbe0.firebaseapp.com",
// projectId: "bullishmarketcap-ffbe0",
// storageBucket: "bullishmarketcap-ffbe0.appspot.com",
// messagingSenderId: "995910038694",
// appId: "1:995910038694:web:c70bd904e6c12740783067",
