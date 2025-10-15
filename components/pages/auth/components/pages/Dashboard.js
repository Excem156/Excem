"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [view, setView] = useState("seller");

  const toggleView = () => {
    setView(view === "admin" ? "seller" : "admin");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Excem Dashboard</h2>
      <Button onClick={toggleView} style={{ marginBottom: "20px" }}>
        Switch to {view === "admin" ? "Seller" : "Admin"} Dashboard
      </Button>

      {view === "admin" ? (
        <AdminDashboard />
      ) : (
        <SellerDashboard />
      )}
    </div>
  );
}

// Admin Dashboard
const AdminDashboard = () => {
  return (
    <div style={{ border: "2px solid #555", padding: "20px", borderRadius: "10px" }}>
      <h3>🛠 Admin Dashboard</h3>
      <ul style={{ listStyle: "none" }}>
        <li>Manage Users</li>
        <li>View All Orders</li>
        <li>Handle Reports</li>
        <li>Platform Analytics</li>
      </ul>
    </div>
  );
};

// Seller Dashboard
const SellerDashboard = () => {
  return (
    <div style={{ border: "2px solid #008000", padding: "20px", borderRadius: "10px" }}>
      <h3>💼 Seller Dashboard</h3>
      <ul style={{ listStyle: "none" }}>
        <li>Add Products</li>
        <li>Track Sales</li>
        <li>Manage Inventory</li>
        <li>Chat with Buyers</li>
      </ul>
    </div>
  );
};
