import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBEDUwwGaoTzfryHANonosJJ5Cc-5-KNQ",
  authDomain: "hack-ae1c4.firebaseapp.com",
  projectId: "hack-ae1c4",
  storageBucket: "hack-ae1c4.firebasestorage.app",
  messagingSenderId: "449803613772",
  appId: "1:449803613772:web:014c7ec9b62244988166e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
