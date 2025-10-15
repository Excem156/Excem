// Excem/Excem/src/firebaseConfig.js

// Import functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Export app to use elsewhere
export default app;
