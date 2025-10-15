"use client";

import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebaseConfig"; // adjust path if needed

export default function Login() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Login to Excem 🔐</h1>
      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", margin: "5px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", margin: "5px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#db4437",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Login with Google
      </button>

      <p style={{ color: "red", marginTop: "15px" }}>{error}</p>
      <p>
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
  }
