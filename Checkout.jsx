import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- COMPANY PAYMENT DETAILS ---
// NOTE: Replace these with the actual company bank account details.
const COMPANY_ACCOUNT_DETAILS = {
    bankName: "Excem Global Bank",
    accountName: "Excem Marketplace LTD",
    accountNumber: "9876543210",
    transferReference: "Use your Order ID as reference",
};

function Checkout() {
    const { currentUser } = useAuth();
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(null);

    if (!currentUser) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Please log in to complete your order.</div>;
    }
    
    if (cartItems.length === 0) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Your cart is empty! Please add items to checkout.</div>;
    }

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            // 1. Create the Order document
            const orderData = {
                customerId: currentUser.uid,
                customerEmail: currentUser.email,
                items: cartItems, // Save the current items in the cart
                totalPrice: totalPrice,
                status: 'pending_payment', // Initial status
                createdAt: serverTimestamp(),
            };

            const docRef = await addDoc(collection(db, "orders"), orderData);
            
            // 2. Clear the user's cart in the database and context
            await clearCart(); 
            
            setOrderPlaced({
                id: docRef.id,
                total: totalPrice.toFixed(2),
            });
        } catch (error) {
            console.error("Error placing order:", error);
            alert("There was an error placing your order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (orderPlaced) {
        return (
            <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', border: '2px solid green', borderRadius: '10px', textAlign: 'center' }}>
                <h2>✅ Order Successfully Placed!</h2>
                <p>Your Order ID is: <strong>{orderPlaced.id}</strong></p>
                <h3 style={{ color: 'green' }}>Total Amount Due: ${orderPlaced.total}</h3>
                
                <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '30px' }}>Payment Instructions (Bank Transfer)</h3>
                
                <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
                    <p>Please transfer the exact amount of **${orderPlaced.total}** to the following company account:</p>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li>**Bank Name:** {COMPANY_ACCOUNT_DETAILS.bankName}</li>
                        <li>**Account Name:** {COMPANY_ACCOUNT_DETAILS.accountName}</li>
                        <li>**Account Number:** <strong style={{ fontSize: '1.2em' }}>{COMPANY_ACCOUNT_DETAILS.accountNumber}</strong></li>
                        <li>**Reference/Memo:** <strong style={{ color: 'red' }}>{orderPlaced.id}</strong> (Mandatory)</li>
                    </ul>
                </div>
                
                <p style={{ marginTop: '20px', fontSize: '0.9em' }}>
                    **IMPORTANT:** Your order will be processed as soon as the Admin confirms payment receipt. This may take up to 24 hours.
                </p>
                
                <button 
                    onClick={() => navigate('/')} 
                    style={{ padding: '10px 30px', marginTop: '30px', backgroundColor: '#007bff', color: 'white' }}
                >
                    Return to Store
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ddd' }}>
            <h1>Final Checkout</h1>
            
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                {cartItems.map((item) => (
                    <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                        <span>{item.productName} (x{item.quantity})</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <h2>Total Due:</h2>
                <h2>${totalPrice.toFixed(2)}</h2>
            </div>

            <p style={{ marginTop: '20px', fontSize: '0.9em', color: '#dc3545' }}>
                By clicking "Place Order," you agree to pay the total amount via bank transfer using the instructions on the next screen.
            </p>

            <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing || cartItems.length === 0}
                style={{ width: '100%', padding: '15px', marginTop: '20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                {isProcessing ? 'Processing...' : `Place Order and Get Payment Details`}
            </button>
        </div>
    );
}

export default Checkout;
