import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsjGZCtXEapLz_U_Eapq_sHYpJMIOZnZg",
  authDomain: "web-undangan-tenrypalli.firebaseapp.com",
  projectId: "web-undangan-tenrypalli",
  storageBucket: "web-undangan-tenrypalli.firebasestorage.app",
  messagingSenderId: "3270800502",
  appId: "1:3270800502:web:969595e5dcd403704c9b57",
  measurementId: "G-LHKQY09SV8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
