"use client";
import { useState } from "react";
import AdminDashboard from "../pages/admin/dashboard";
import SellerDashboard from "../pages/seller/dashboard";
import { Button } from "@/components/ui/button";

export default function DashboardSwitch() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div style={{ padding: "20px" }}>
      <Button onClick={() => setIsAdmin(!isAdmin)}>
        Switch to {isAdmin ? "Seller" : "Admin"} Dashboard
      </Button>
      <div style={{ marginTop: "20px" }}>
        {isAdmin ? <AdminDashboard /> : <SellerDashboard />}
      </div>
    </div>
  );
}
