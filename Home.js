"use client";
import React from "react";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Excem 👋</h1>
      <p>Your all-in-one marketplace for sellers and buyers.</p>
      <div style={{ marginTop: "30px" }}>
        <a href="/login" style={{ margin: "10px" }}>Login</a>
        <a href="/signup" style={{ margin: "10px" }}>Signup</a>
        <a href="/dashboard" style={{ margin: "10px" }}>Dashboard</a>
      </div>
    </div>
  );
  }
