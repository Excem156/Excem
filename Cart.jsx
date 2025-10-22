// src/components/pages/Cart.jsx
// ... (existing imports) ...
import { Link, useNavigate } from 'react-router-dom'; // <-- Add useNavigate

function Cart() {
    const { currentUser } = useAuth();
    const { cartItems, totalPrice, loading, removeItemFromCart, addItemToCart, clearCart } = useCart();
    const navigate = useNavigate(); // <-- Initialize navigate

    // ... (existing loading and empty cart checks) ...

    return (
        <div style={{ maxWidth: '900px', margin: '50px auto', padding: '20px', border: '1px solid #ddd' }}>
            <h1>🛒 Your Shopping Cart</h1>
            
            {/* ... (Existing map of cart items remains the same) ... */}
            
            {cartItems.length === 0 ? (
                // ... (Existing empty cart message) ...
            ) : (
                <div>
                    {/* ... (Existing map of cart items) ... */}
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px', borderTop: '2px solid #333', padding: '20px 0' }}>
                        <h2>Cart Total: <span style={{ color: 'green' }}>${totalPrice.toFixed(2)}</span></h2>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button onClick={clearCart} style={{ padding: '10px 20px', backgroundColor: '#f0ad4e', color: 'white', border: 'none', cursor: 'pointer' }}>
                            Clear Cart
                        </button>
                        <button 
                            onClick={() => navigate('/checkout')} // <-- UPDATED CLICK HANDLER
                            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
 
