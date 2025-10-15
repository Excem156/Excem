"use client";

import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebaseConfig";

export default function Dashboard() {
  const auth = getAuth(app);
  const [dashboardType, setDashboardType] = useState("seller");

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "/";
  };

  const switchDashboard = () => {
    setDashboardType((prev) => (prev === "seller" ? "admin" : "seller"));
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>
        {dashboardType === "seller" ? "Seller Dashboard 🛍️" : "Admin Dashboard ⚙️"}
      </h1>
      <p>
        {dashboardType === "seller"
          ? "Manage your products, sales, and customers here."
          : "View analytics, manage users, and control platform settings."}
      </p>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={switchDashboard}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Switch to {dashboardType === "seller" ? "Admin" : "Seller"}
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
