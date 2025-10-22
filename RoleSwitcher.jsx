import React from 'react';
import { useAuth } from '../contexts/AuthContext'; 

function RoleSwitcher() {
  const { isAdmin, currentView, switchView, currentUser } = useAuth();

  // Only show the switcher if the user is logged in AND is an Admin
  if (!currentUser || !isAdmin) {
    return null;
  }
  
  // Array of available role views for this user (Admin + Customer)
  const availableViews = [
    { name: 'Customer Store', role: 'customer' },
    { name: 'Admin Dashboard', role: 'admin' },
  ];

  return (
    <div style={{ 
      position: 'absolute', 
      top: '10px', 
      right: '10px', 
      padding: '8px', 
      background: '#f0f0f0', 
      border: '1px solid #ddd',
      borderRadius: '5px',
      display: 'flex', 
      gap: '10px',
      zIndex: 1000 
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
