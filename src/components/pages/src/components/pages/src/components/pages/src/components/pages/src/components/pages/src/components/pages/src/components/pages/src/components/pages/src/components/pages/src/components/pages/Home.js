"use client";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Excem 🌍</h1>
      <p>Your one-stop platform for worldwide digital services and sales.</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <button style={{ margin: "10px" }}>Login</button>
        </Link>
        <Link to="/signup">
          <button style={{ margin: "10px" }}>Sign Up</button>
        </Link>
        <Link to="/social">
          <button style={{ margin: "10px" }}>Sign in with Google</button>
        </Link>
      </div>
    </div>
  );
  }
