import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE-pErkccLkwlcVkUn4IG72qLfZt3gcOk",
  authDomain: "wander-wise-pwa.firebaseapp.com",
  projectId: "wander-wise-pwa",
  storageBucket: "wander-wise-pwa.firebasestorage.app",
  messagingSenderId: "63135498021",
  appId: "1:63135498021:web:ab1c065857c77df4b024cc",
  measurementId: "G-6X67S3NXR9",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);