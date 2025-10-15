"use client";
import React, { useState } from "react";
import { auth } from "../../../firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Button } from "@/components/ui/button";

export default function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  // Initialize Recaptcha
  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );
  };

  // Send OTP
  const sendOtp = async () => {
    if (!phone) return alert("Enter your phone number first 📞");
    setupRecaptcha();
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setVerificationId(confirmation);
      alert("OTP sent ✅");
    } catch (error) {
      alert(error.message);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!otp || !verificationId) return alert("Enter OTP to verify");
    try {
      await verificationId.confirm(otp);
      alert("Phone verified successfully 🎉");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Login / Signup with Phone</h2>
      <input
        type="text"
        placeholder="Enter phone number (e.g. +2348000000000)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px" }}
      />
      <Button onClick={sendOtp}>Send OTP</Button>
      <div id="recaptcha-container"></div>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px" }}
      />
      <Button onClick={verifyOtp}>Verify OTP</Button>
    </div>
  );
                }
