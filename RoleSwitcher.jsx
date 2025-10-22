import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Path depends on where you put AuthContext.jsx

function RoleSwitcher() {
  // Pull current user roles and the function to change the view
  const { userRoles, currentView, switchView, currentUser } = useAuth();

  // Only show the switcher if the user is logged in AND has more than one role option
  if (!currentUser || (!userRoles.admin && !userRoles.seller)) {
    return null;
  }
  
  // Array of available role views for this user
  const availableViews = [
    { name: 'Customer Store', role: 'customer' },
    userRoles.seller && { name: 'Seller Panel', role: 'seller' },
    userRoles.admin && { name: 'Admin Dashboard', role: 'admin' },
  ].filter(Boolean); // Filter out the false values (roles the user doesn't have)

  return (
    <div style={{ 
      position: 'absolute', // Position to the top right
      top: '10px', 
      right: '10px', 
      padding: '8px', 
      background: '#f0f0f0', 
      border: '1px solid #ddd',
      borderRadius: '5px',
      display: 'flex', 
      gap: '10px',
      zIndex: 1000 // Ensure it's above other content
    }}>
      <strong>Switch View:</strong>
      
      {availableViews.map((view) => (
        <button
          key={view.role}
          onClick={() => switchView(view.role)}
          disabled={currentView === view.role}
          style={{
            cursor: currentView === view.role ? 'default' : 'pointer',
            fontWeight: currentView === view.role ? 'bold' : 'normal',
            border: currentView === view.role ? '1px solid #007bff' : '1px solid #ccc',
            backgroundColor: currentView === view.role ? '#e6f2ff' : 'white',
            padding: '4px 8px',
            borderRadius: '3px'
          }}
        >
          {view.name}
        </button>
      ))}
    </div>
  );
}

export default RoleSwitcher;
