"use client";
import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {
        console.log("Recaptcha verified");
      },
    });
  };

  const sendOtp = async () => {
    if (!phoneNumber) return alert("Enter your phone number!");
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmation);
      alert("OTP sent successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP ❌");
    }
  };

  const verifyOtp = async () => {
    if (!otp || !verificationId) return alert("Enter OTP first!");
    try {
      await verificationId.confirm(otp);
      alert("Phone verified successfully 🎉");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Login with Phone Number</h2>
      <input
        type="tel"
        placeholder="Enter phone number with country code"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendOtp}>Send OTP</button>

      <div id="recaptcha-container"></div>

      {verificationId && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
          }
