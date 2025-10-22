import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Cart() {
    const { currentUser } = useAuth();
    const { cartItems, totalPrice, loading, removeItemFromCart, addItemToCart, clearCart } = useCart();

    if (!currentUser) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Shopping Cart</h2>
                <p>Please <Link to="/login">log in</Link> to view and manage your cart.</p>
            </div>
        );
    }
    
    if (loading) {
        return <div style={{ padding: '40px' }}>Loading cart...</div>;
    }

    return (
        <div style={{ maxWidth: '900px', margin: '50px auto', padding: '20px', border: '1px solid #ddd' }}>
            <h1>🛒 Your Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
                <div>
                    <p>Your cart is empty.</p>
                    <Link to="/">Continue Shopping</Link>
                </div>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.productId} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '15px 0', 
                            borderBottom: '1px solid #eee' 
                        }}>
                            <div>
                                <strong>{item.productName}</strong>
                                <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#666' }}>
                                    ${item.price.toFixed(2)} each
                                </p>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                {/* Quantity controls */}
                                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
                                    <button 
                                        onClick={() => removeItemFromCart(item.productId)} // Simple remove function
                                        style={{ background: 'none', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        -
                                    </button>
                                    <span style={{ padding: '5px 10px' }}>{item.quantity}</span>
                                    <button 
                                        onClick={() => addItemToCart(item)} // Re-use addItem to increase
                                        style={{ background: 'none', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Total Price for Item */}
                                <strong style={{ minWidth: '80px', textAlign: 'right' }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </strong>
                                
                                {/* Remove button */}
                                <button 
                                    onClick={() => removeItemFromCart(item.productId)} 
                                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px', borderTop: '2px solid #333', padding: '20px 0' }}>
                        <h2>Cart Total: <span style={{ color: 'green' }}>${totalPrice.toFixed(2)}</span></h2>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button onClick={clearCart} style={{ padding: '10px 20px', backgroundColor: '#f0ad4e', color: 'white' }}>
                            Clear Cart
                        </button>
                        <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white' }}>
                            Proceed to Checkout (Future feature)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
