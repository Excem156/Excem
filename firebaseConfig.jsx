// src/firebaseConfig.js (or .jsx)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <--- Add this import

const firebaseConfig = {
    // ... your keys here ...
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and export it
const auth = getAuth(app); // <--- Initialize auth

export { auth }; // <--- Export Auth instance 
export default app;
