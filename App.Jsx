import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Ensure paths are correct for your folder structure
import Home from './Home';
import Login from './Login'; // Assuming these are your basic form pages
import Signup from './Signup'; 
import AdminDashboard from './components/pages/AdminDashboard'; 
import SellerPanel from './components/pages/SellerPanel';       
import SellProduct from './components/pages/SellProduct';

// --- Access Control Utility Component ---
const ProtectedRoute = ({ children, requiredRole }) => {
    const { currentUser, userRoles, loading } = useAuth();

    if (loading) return <div>Loading access status...</div>;
    
    // Check 1: Must be logged in
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    
    // Check 2: Must have the required role in the database
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
        if (currentView === 'seller') return '/seller';
        return '/'; // Default to home/customer view
    };

    return (
        <Router>
            {/* The RoleSwitcher will be placed inside AdminDashboard/SellerPanel */}
            <Routes>
                {/* PUBLIC ROUTES (Customer View) */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Accessible to any LOGGED-IN user */}
                <Route path="/sell" element={<ProtectedRoute><SellProduct /></ProtectedRoute>} /> 
                
                {/* DASHBOARD REDIRECT (Redirects logged-in users) */}
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

                {/* SELLER-ONLY ROUTE */}
                <Route 
                    path="/seller" 
                    element={
                        <ProtectedRoute requiredRole="seller">
                            <SellerPanel />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Fallback for 404 pages */}
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
