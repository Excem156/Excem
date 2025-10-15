"use client";

import React, { useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from "../../firebaseConfig";

export default function PhoneAuth() {
  const auth = getAuth(app);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
  };

  const handleSendOtp = async () => {
    setupRecaptcha();
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      alert("OTP sent successfully!");
    } catch (error) {
      alert("Error sending OTP: " + error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert("Phone verified successfully!");
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Invalid OTP: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Login with Phone</h2>
      <div id="recaptcha-container"></div>

      {!confirmationResult ? (
        <div>
          <input
            type="tel"
            placeholder="+234XXXXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ padding: "10px", marginBottom: "10px" }}
          />
          <button onClick={handleSendOtp} style={{ padding: "10px 20px" }}>
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ padding: "10px", marginBottom: "10px" }}
          />
          <button onClick={handleVerifyOtp} style={{ padding: "10px 20px" }}>
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}
