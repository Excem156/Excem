// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEsJLeMuz3JMS4L9rbjcnNK7S1nXzigqc",
  authDomain: "excem-ce973.firebaseapp.com",
  projectId: "excem-ce973",
  storageBucket: "excem-ce973.firebasestorage.app",
  messagingSenderId: "411960390993",
  appId: "1:411960390993:web:7c702ff2cdcb8b70da4f70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
