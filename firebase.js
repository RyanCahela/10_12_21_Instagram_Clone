// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAELFLlYk23AvTwqyskRiFuhSqR-eNoA9I",
  authDomain: "instagram-clone-4cd32.firebaseapp.com",
  projectId: "instagram-clone-4cd32",
  storageBucket: "instagram-clone-4cd32.appspot.com",
  messagingSenderId: "807925850719",
  appId: "1:807925850719:web:9aec1344a2a0284fccf1ea",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
