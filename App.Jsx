// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// ... (existing imports)
import Cart from './components/pages/Cart'; // <-- NEW IMPORT

function App() {
    // ... (existing logic)
    return (
        <Router>
            <Routes>
                {/* PUBLIC ROUTES */}
                <Route path="/" element={<Home />} />
                {/* ... (existing login/signup/sell routes) ... */}
                
                {/* CART ROUTE - Accessible to all */}
                <Route path="/cart" element={<Cart />} /> {/* <-- NEW ROUTE */}

                {/* ... (existing admin routes) ... */}
            </Routes>
        </Router>
    );
}

export default App;
