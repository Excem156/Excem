"use client";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Welcome to Your Dashboard 🎉</h1>
      <p>You are successfully logged in!</p>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}
