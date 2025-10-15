import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import SellerDashboard from "./SellerDashboard";

function DashboardSwitcher() {
  const [active, setActive] = useState("admin");

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Excem Dashboard</h1>
      <div style={{ margin: "10px" }}>
        <button onClick={() => setActive("admin")}>Admin Dashboard</button>
        <button onClick={() => setActive("seller")} style={{ marginLeft: "10px" }}>
          Seller Dashboard
        </button>
      </div>

      {active === "admin" ? <AdminDashboard /> : <SellerDashboard />}
    </div>
  );
}

export default DashboardSwitcher;
