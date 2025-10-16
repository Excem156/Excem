"use client";
import React from "react";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h1>Welcome to Excem 🌍</h1>
      <p>Your all-in-one marketplace for sellers and buyers.</p>

      <div style={{ marginTop: "40px" }}>
        <a
          href="/signup"
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "12px 25px",
            borderRadius: "8px",
            textDecoration: "none",
            marginRight: "15px",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </a>

        <a
          href="/login"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "12px 25px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Log In
        </a>
      </div>

      <div style={{ marginTop: "30px" }}>
        <a
          href="/dashboard"
          style={{
            color: "#333",
            textDecoration: "underline",
            fontSize: "14px",
          }}
        >
          Go to Dashboard →
        </a>
      </div>
    </div>
  );
}
