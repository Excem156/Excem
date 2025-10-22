import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RoleSwitcher from '../RoleSwitcher'; // Import the switcher component

function SellerPanel() {
  const { currentUser } = useAuth();
  
  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1>📦 Seller Panel</h1>
      
      {/* 🎯 Include the switcher here for multi-role users (Admin/Seller) */}
      <RoleSwitcher />
      
      <p>Welcome, {currentUser?.email}. This is your private dashboard for managing your approved Excem listings.</p>
      
      <h3 style={{marginTop: '30px'}}>Seller Management Tasks:</h3>
      <ul>
        <li>✅ **My Approved Products:** View all items currently live in the app.</li>
        <li>📈 **Recent Orders:** Process and fulfill new orders placed by customers.</li>
        <li>💰 **Payout Status:** View your balance and pending payouts.</li>
      </ul>
      
      <div style={{ marginTop: '50px', border: '1px solid #ccc', padding: '20px' }}>
        {/* FUTURE: Logic to display the seller's approved products and orders will go here. */}
        <p>Seller tools will be integrated here.</p>
      </div>
    </div>
  );
}

export default SellerPanel;
