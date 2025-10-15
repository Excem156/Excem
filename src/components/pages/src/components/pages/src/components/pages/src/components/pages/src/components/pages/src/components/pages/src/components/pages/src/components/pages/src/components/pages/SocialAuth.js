"use client";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function SocialAuth() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome ${user.displayName || "User"} 🎉`);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Google login failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Social Login</h2>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}
