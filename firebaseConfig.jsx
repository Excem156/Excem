import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- ADDED FIRESTORE

const firebaseConfig = {
  // IMPORTANT: Replace the placeholders below with your actual Firebase keys
  apiKey: "YOUR_API_KEY", 
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app); // <-- INITIALIZE FIRESTORE

// Export all services you will use
export { auth, db }; // <-- EXPORT BOTH AUTH AND DB
export default app;
