import React from 'react';
import { useAuth } from './contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const { currentUser, logout, isSeller } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Excem!</h1>
            
            {currentUser ? (
                // User is logged in
                <div>
                    <p>Logged in as: <strong>{currentUser.email}</strong></p>
                    
                    {/* Link for ALL logged-in users to upload a product */}
                    <Link to="/sell" style={{ margin: '10px', padding: '10px', border: '1px solid blue' }}>
                        SELL A PRODUCT
                    </Link>

                    {/* Link for APPROVED sellers to manage their panel */}
                    {isSeller && (
                        <Link to="/seller" style={{ margin: '10px', padding: '10px', border: '1px solid green' }}>
                            GO TO SELLER PANEL
                        </Link>
                    )}

                    <button onClick={handleLogout} style={{ margin: '10px', padding: '10px', backgroundColor: 'red', color: 'white' }}>
                        Logout
                    </button>
                </div>
            ) : (
                // User is NOT logged in
                <div>
                    <p>Please log in to browse and sell.</p>
                    <Link to="/login" style={{ margin: '10px' }}>Login</Link> | 
                    <Link to="/signup" style={{ margin: '10px' }}>Signup</Link>
                </div>
            )}
        </div>
    );
}

export default Home;
