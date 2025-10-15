"use client";
import React from "react";
import Home from "@/components/pages/Home";
import Login from "@/components/pages/auth/Login";
import Signup from "@/components/pages/auth/Signup";
import Dashboard from "@/components/pages/auth/Dashboard";
import PhoneAuth from "@/components/pages/auth/PhoneAuth";

export default function App() {
  // simple router based on the current path
  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  if (path === "/login") return <Login />;
  if (path === "/signup") return <Signup />;
  if (path === "/dashboard") return <Dashboard />;
  if (path === "/phone") return <PhoneAuth />;
  
  return <Home />;
}
