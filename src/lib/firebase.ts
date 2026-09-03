import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// User's custom Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBkZbmDKpzuLYHe_SHIQDb_zXzg9g5_eUY",
  authDomain: "creatorssync-media.firebaseapp.com",
  databaseURL: "https://creatorssync-media-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "creatorssync-media",
  storageBucket: "creatorssync-media.firebasestorage.app",
  messagingSenderId: "771545789666",
  appId: "1:771545789666:web:4b4c6eb95d67df32d91abb",
  measurementId: "G-PMJT3Q9NVH"
};

// Initialize Firebase safely without duplicate app instance creation
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics if supported in browser environment
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Cloud Firestore database instance for creatorssync-media project
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
