"use client";

import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import { app } from "../../firebaseConfig";

export default function SocialAuth() {
  const auth = getAuth(app);

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google login successful!");
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Google login failed: " + error.message);
    }
  };

  // iCloud Login (Apple)
  const handleAppleLogin = async () => {
    const provider = new OAuthProvider("apple.com");
    try {
      await signInWithPopup(auth, provider);
      alert("Apple login successful!");
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Apple login failed: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Or sign in using</h2>
      <button
        onClick={handleGoogleLogin}
        style={{
          backgroundColor: "#4285F4",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          marginRight: "10px",
          cursor: "pointer",
        }}
      >
        Login with Google
      </button>
      <button
        onClick={handleAppleLogin}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Login with Apple
      </button>
    </div>
  );
}
