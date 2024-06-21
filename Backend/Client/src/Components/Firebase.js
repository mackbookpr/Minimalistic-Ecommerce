// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXRlHMHV6RbloyV1Dk7CnbyTgbLTLkiDk",
  authDomain: "sign-in-e4ea7.firebaseapp.com",
  projectId: "sign-in-e4ea7",
  storageBucket: "sign-in-e4ea7.appspot.com",
  messagingSenderId: "332485707956",
  appId: "1:332485707956:web:a2c29d20eaffccc4f36fe1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;