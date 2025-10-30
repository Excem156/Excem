// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext'; 
import { CartProvider } from './contexts/CartContext'; // <-- NEW IMPORT

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
        <CartProvider> {/* <-- NEW WRAPPER */}
            <App />
        </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);p
resolve "./App.jsx" from "index.jsx"
