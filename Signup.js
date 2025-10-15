"use client";

import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebaseConfig"; // adjust path if needed

export default function Signup() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Google signup successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Create an Excem Account ✨</h1>
      <form onSubmit={handleSignup} style={{ marginTop: "20px" }}>
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
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </form>

      <button
        onClick={handleGoogleSignup}
        style={{
          padding: "10px 20px",
          backgroundColor: "#db4437",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sign Up with Google
      </button>

      <p style={{ color: "red", marginTop: "15px" }}>{error}</p>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
            }
