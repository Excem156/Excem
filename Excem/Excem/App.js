"use client";
import app from "./firebaseConfig";
import React from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./components/pages/Dashboard";
import PhoneAuth from "./components/pages/PhoneAuth";
import SocialAuth from "./components/pages/SocialAuth";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/phone" element={<PhoneAuth />} />
        <Route path="/social" element={<SocialAuth />} />
      </Routes>
    </Router>
  );
}
