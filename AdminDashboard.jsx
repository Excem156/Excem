import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

function AdminDashboard() {
    const { currentUser, currentView } = useAuth();
    const [pendingProducts, setPendingProducts] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]); // <-- NEW STATE FOR ORDERS
    const [loading, setLoading] = useState(true);

    // --- Data Fetching ---

    const fetchPendingData = async () => {
        setLoading(true);
        try {
            // 1. Fetch PENDING PRODUCTS (Approval Queue)
            const productQuery = query(collection(db, "products"), where("status", "==", "pending"));
            const productSnapshot = await getDocs(productQuery);
            const productsList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPendingProducts(productsList);

            // 2. Fetch PENDING ORDERS (Payment Queue) <-- NEW FETCH
            const orderQuery = query(collection(db, "orders"), where("status", "==", "pending_payment"));
            const orderSnapshot = await getDocs(orderQuery);
            const ordersList = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPendingOrders(ordersList);

        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentView === 'admin') {
            fetchPendingData();
        }
    }, [currentView]);

    // --- Product Management ---

    const handleProductApproval = async (productId, status) => {
        try {
            const productRef = doc(db, "products", productId);
            await updateDoc(productRef, {
                status: status, // 'approved' or 'disapproved'
                isLive: status === 'approved' ? true : false,
            });
            fetchPendingData(); // Refresh the list
            alert(`Product ${productId} ${status} successfully.`);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    // --- Order Management ---

    const handlePaymentReceived = async (orderId) => { // <-- NEW FUNCTION
        if (!window.confirm(`Confirm payment received for Order ID: ${orderId}?`)) return;

        try {
            const orderRef = doc(db, "orders", orderId);
            await updateDoc(orderRef, {
                status: 'payment_received', // Update status
                // You can add a timestamp here if needed: paymentDate: serverTimestamp(),
            });
            fetchPendingData(); // Refresh the list
            alert(`Order ${orderId} marked as 'Payment Received'. Now ready for shipping.`);
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };
    
    if (loading) return <div>Loading Admin Dashboard...</div>;

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! (Viewing UID: {currentUser.uid})</p>
            
            {/* ------------------------------------------------------------- */}
            {/* PAYMENT CONFIRMATION SECTION (NEW) */}
            {/* ------------------------------------------------------------- */}
            <h2 style={{ marginTop: '40px', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                💰 Pending Orders (Payment Verification)
            </h2>
            
            {pendingOrders.length === 0 ? (
                <p>No orders currently awaiting payment confirmation.</p>
            ) : (
                pendingOrders.map(order => (
                    <div key={order.id} style={{ border: '1px solid #007bff', padding: '15px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <strong>Order ID:</strong> {order.id}
                            <p><strong>Customer:</strong> {order.customerEmail || order.customerId}</p>
                            <p><strong>Total Amount:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>${order.totalPrice.toFixed(2)}</span></p>
                            <p style={{ marginTop: '5px', fontSize: '0.9em' }}>Items: {order.items.map(i => `${i.productName} (x${i.quantity})`).join(', ')}</p>
                        </div>
                        <button 
                            onClick={() => handlePaymentReceived(order.id)}
                            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                        >
                            Payment Received
                        </button>
                    </div>
                ))
            )}
            
            {/* ------------------------------------------------------------- */}
            {/* PRODUCT APPROVAL SECTION (EXISTING) */}
            {/* ------------------------------------------------------------- */}
            <h2 style={{ marginTop: '40px', borderBottom: '2px solid #f0ad4e', paddingBottom: '10px' }}>
                📦 Pending Product Approvals
            </h2>

            {pendingProducts.length === 0 ? (
                <p>No products currently awaiting approval.</p>
            ) : (
                pendingProducts.map(product => (
                    <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <strong>{product.productName}</strong>
                            <p>{product.description}</p>
                            <p>Submitted by: {product.sellerId}</p>
                        </div>
                        <div>
                            <button 
                                onClick={() => handleProductApproval(product.id, 'approved')}
                                style={{ padding: '8px 15px', backgroundColor: 'green', color: 'white', marginRight: '10px' }}
                            >
                                Approve
                            </button>
                            <button 
                                onClick={() => handleProductApproval(product.id, 'disapproved')}
                                style={{ padding: '8px 15px', backgroundColor: 'red', color: 'white' }}
                            >
                                Disapprove
                            </button>
                        </div>
                    </div>
                ))
            )}
            
            <p style={{ marginTop: '50px' }}>Current View: <strong>{currentView}</strong></p>
        </div>
    );
}

export default AdminDashboard;
