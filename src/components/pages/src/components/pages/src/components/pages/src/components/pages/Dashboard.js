"use client";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export default function Dashboard() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Dashboard</h2>
      <p>Welcome to your user dashboard 🎉</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
