import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuD0EdBPKnP8A-gMp-ncDRMXdJxt5UbWs",
  authDomain: "stockgraph-4fbfb.firebaseapp.com",
  projectId: "stockgraph-4fbfb",
  storageBucket: "stockgraph-4fbfb.appspot.com", // Corrected storage bucket
  messagingSenderId: "332080136773",
  appId: "1:332080136773:web:2fb4d04f90a65231aad92c",
  measurementId: "G-Z66CRJKD2R",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
