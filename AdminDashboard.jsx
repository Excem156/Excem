import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RoleSwitcher from '../RoleSwitcher'; 
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'; // <-- NEW: Import more Firestore functions
import { db } from '../../firebaseConfig'; 

function AdminDashboard() {
  const { currentUser } = useAuth();
  const [pendingProducts, setPendingProducts] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("Awaiting payment approval list...");
  const [loading, setLoading] = useState(true);

  // Function to fetch products pending approval
  const fetchPendingProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "products"), where("status", "==", "pending"));
      const querySnapshot = await getDocs(q);
      
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingProducts(productsList);

    } catch (error) {
      console.error("Error fetching pending products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to approve a product
  const approveProduct = async (productId) => {
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, {
        status: 'approved',
        isLive: true, // Make it visible on the public store
        approvedBy: currentUser.uid,
        approvedAt: new Date(),
      });
      // Refresh the list after approval
      fetchPendingProducts(); 
      alert(`Product ${productId} approved and is now live!`);
    } catch (error) {
      console.error("Error approving product:", error);
    }
  };

  // Function to mark a payment as received (Placeholder)
  const markPaymentReceived = (sellerId) => {
    // FUTURE: Implement logic to update a 'payments' collection or user balance
    setPaymentStatus(`Payment marked received for Seller: ${sellerId}. (Database logic pending)`);
  };


  // Fetch products when the component mounts
  useEffect(() => {
    fetchPendingProducts();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h1>👑 Admin Dashboard</h1>
      <RoleSwitcher /> 
      
      <p>Welcome, {currentUser?.email}. You have full platform control.</p>
      
      <h3 style={{marginTop: '30px'}}>Product Approval Queue ({pendingProducts.length} pending)</h3>
      <div style={{ border: '1px solid #ccc', padding: '20px', minHeight: '150px' }}>
        {loading && <p>Loading pending products...</p>}
        {!loading && pendingProducts.length === 0 && <p>✅ No products pending review.</p>}

        {!loading && pendingProducts.map((product) => (
          <div key={product.id} style={{ borderBottom: '1px dashed #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>{product.productName}</strong> by {product.sellerEmail} (${product.price})
              <p style={{ fontSize: '0.8em', color: '#666' }}>{product.description}</p>
            </div>
            <button 
              onClick={() => approveProduct(product.id)}
              style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
      
      <h3 style={{marginTop: '30px'}}>Payment Confirmation</h3>
      <p>{paymentStatus}</p>
      <button onClick={() => markPaymentReceived('S987')} style={{ padding: '8px', backgroundColor: 'orange', color: 'white' }}>
        Mark Test Payment as Received
      </button>
    </div>
  );
}

export default AdminDashboard;
