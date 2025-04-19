import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.VITE_APIKEY,
  authDomain: import.meta.VITE_AUTHDOMAIN,
  projectId: import.meta.VITE_PROJECTED,
  storageBucket: import.meta.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.VITE_MESSEGINGSENDERID,
  appId: import.meta.VITE_APPID.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
