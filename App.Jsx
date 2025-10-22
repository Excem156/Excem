import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// ... (Existing Imports) ...
// NOTE: You can now DELETE the SellerPanel.jsx file from your project!
import AdminDashboard from './components/pages/AdminDashboard'; 
import SellProduct from './components/pages/Sell product';


// --- Access Control Utility Component (remains the same) ---
const ProtectedRoute = ({ children, requiredRole }) => {
    const { currentUser, userRoles, loading } = useAuth();
    // ... (logic remains the same) ...
    // Note: Since 'seller' role is gone, only use requiredRole="admin"
    if (loading) return <div>Loading access status...</div>;
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    if (requiredRole && !userRoles[requiredRole]) {
        return <h1>403 Access Denied. You do not have the required permissions.</h1>;
    }
    return children;
};

function App() {
    const { currentView, loading } = useAuth();
    
    if (loading) return <div>Loading application...</div>;

    // Determine the user's default dashboard path based on their highest role
    const getDashboardPath = () => {
        if (currentView === 'admin') return '/admin';
        return '/'; // Always default to home/customer view
    };

    return (
        <Router>
            <Routes>
                {/* PUBLIC ROUTES (Customer View) */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
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
