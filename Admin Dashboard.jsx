import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RoleSwitcher from '../RoleSwitcher'; // You'll create this next!

function AdminDashboard() {
  const { currentUser } = useAuth();
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h1>👑 Admin Dashboard</h1>
      {/* For switching to Seller or Customer view if the user has multiple roles */}
      <RoleSwitcher /> 
      
      <p>Welcome, {currentUser?.email}. You have full platform control.</p>
      
      <h3 style={{marginTop: '30px'}}>Tasks:</h3>
      <ul>
        <li>✅ **Approve Pending Products:** Allow new seller items to go live.</li>
        <li>💰 **Confirm Payments Received:** Mark large seller payments as received.</li>
        <li>👥 **Manage User Accounts & Roles:** Promote customers to sellers.</li>
      </ul>
      
      <div style={{ marginTop: '50px', border: '1px solid #ccc', padding: '20px' }}>
        {/* FUTURE: Implement product listing/payment management components here */}
        <p>Admin tools will be built here.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
