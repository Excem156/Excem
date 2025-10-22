// src/Home.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useCart } from './contexts/CartContext'; // <-- NEW IMPORT
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore'; // <-- NEW IMPORT
import { db } from './firebaseConfig'; // <-- NEW IMPORT

function Home() {
    const { currentUser, logout } = useAuth();
    const { addItemToCart, totalItems } = useCart(); // <-- NEW CART HOOK
    const navigate = useNavigate();
    const [liveProducts, setLiveProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const handleLogout = async () => { /* ... (existing logout logic) ... */ };

    // Function to fetch approved products
    const fetchLiveProducts = async () => {
        setLoadingProducts(true);
        try {
            // Query Firestore for products where isLive is true (approved)
            const q = query(collection(db, "products"), where("isLive", "==", true));
            const querySnapshot = await getDocs(q);
            
            const productsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                productId: doc.id, // Ensure productId field exists
            }));
            setLiveProducts(productsList);
        } catch (error) {
            console.error("Error fetching live products:", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    useEffect(() => {
        fetchLiveProducts();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h1>Welcome to Excem!</h1>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
                {currentUser ? (
                    <>
                        <p>Logged in as: <strong>{currentUser.email}</strong></p>
                        <Link to="/sell" style={{ border: '1px solid blue', padding: '8px' }}>SELL A PRODUCT</Link>
                        {/* Cart Link with count */}
                        <Link to="/cart" style={{ border: '1px solid black', padding: '8px', position: 'relative' }}>
                            🛒 Cart ({totalItems})
                        </Link>
                        <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', padding: '8px' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                        <Link to="/cart">🛒 Cart (0)</Link>
                    </>
                )}
            </div>

            <h2 style={{marginTop: '40px'}}>Approved Products</h2>
            
            {loadingProducts && <p>Loading products...</p>}
            {!loadingProducts && liveProducts.length === 0 && <p>No products are currently approved and live.</p>}

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '20px' }}>
                {liveProducts.map(product => (
                    <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', width: '300px', textAlign: 'left' }}>
                        <h3>{product.productName}</h3>
                        <p>{product.description}</p>
                        <p><strong>Price: ${product.price.toFixed(2)}</strong></p>
                        
                        <button 
                            onClick={() => addItemToCart(product)}
                            disabled={!currentUser}
                            style={{ 
                                padding: '8px 15px', 
                                backgroundColor: !currentUser ? '#ccc' : '#28a745', 
                                color: 'white',
                                border: 'none',
                                cursor: !currentUser ? 'not-allowed' : 'pointer'
                            }}
                        >
                            { !currentUser ? 'Login to Add' : 'Add to Cart' }
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
