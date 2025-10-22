// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
// ... (existing imports) ...
import Checkout from './components/pages/Checkout'; // <-- NEW IMPORT

// ... (ProtectedRoute component remains the same) ...

function App() {
    const { currentView, loading } = useAuth();
    
    if (loading) return <div>Loading application...</div>;

    // ... (getDashboardPath remains the same) ...

    return (
        <Router>
            <Routes>
                {/* PUBLIC ROUTES (Customer View) */}
                <Route path="/" element={<Home />} />
                {/* ... (existing login/signup routes) ... */}
                
                {/* CART AND CHECKOUT ROUTES */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} /> {/* <-- NEW ROUTE */}
                
                {/* SELL PRODUCT: Accessible to any LOGGED-IN user */}
                <Route path="/sell" element={<ProtectedRoute><SellProduct /></ProtectedRoute>} /> 
                
                {/* DASHBOARD REDIRECT */}
                <Route path="/dashboard" element={<Navigate to={getDashboardPath()} replace />} />

                {/* ADMIN-ONLY ROUTE */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
                
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
