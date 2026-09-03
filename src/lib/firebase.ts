import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// User web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBkZbmDKpzuLYHe_SHIQDb_zXzg9g5_eUY",
  authDomain: "creatorssync-media.firebaseapp.com",
  projectId: "creatorssync-media",
  storageBucket: "creatorssync-media.firebasestorage.app",
  messagingSenderId: "771545789666",
  appId: "1:771545789666:web:4b4c6eb95d67df32d91abb",
  measurementId: "G-PMJT3Q9NVH"
};

// Initialize Firebase safely without duplicate app instance creation
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore database instance
export const db = getFirestore(app);
