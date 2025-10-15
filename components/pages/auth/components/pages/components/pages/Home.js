"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigateTo = (page) => {
    window.location.href = `/${page}`;
  };

  return (
    <div
      style={{
        padding: "60px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Welcome to Excem</h1>
      <p style={{ marginBottom: "20px" }}>
        Choose where you want to go below 👇
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Button onClick={() => navigateTo("login")}>Login</Button>
        <Button onClick={() => navigateTo("signup")}>Sign Up</Button>
        <Button onClick={() => navigateTo("dashboard")}>Dashboard</Button>
      </div>
    </div>
  );
        }
