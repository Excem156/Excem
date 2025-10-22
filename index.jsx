import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Ensure this path is correct for your AuthContext file
import { AuthProvider } from './contexts/AuthContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider> {/* <-- WRAPPER ADDED */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
