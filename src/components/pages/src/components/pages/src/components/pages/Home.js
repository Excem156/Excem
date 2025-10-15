"use client";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Excem</h1>
      <p>Your multi-auth demo app built with Firebase 🔥</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/login"><button>Login</button></Link> &nbsp;
        <Link to="/signup"><button>Signup</button></Link> &nbsp;
        <Link to="/phone"><button>Phone Login</button></Link> &nbsp;
        <Link to="/social"><button>Google Login</button></Link> &nbsp;
        <Link to="/dashboard"><button>Dashboard</button></Link>
      </div>
    </div>
  );
          }
