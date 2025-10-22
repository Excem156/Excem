import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RoleSwitcher from '../RoleSwitcher';
import { collection, query, where, getDocs } from 'firebase/firestore'; // <-- NEW: Import Firestore functions
import { db } from '../../firebaseConfig';

function SellerPanel() {
  const { currentUser } = useAuth();
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch products belonging to the current user
  const fetchMyProducts = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const productsRef = collection(db, "products");
      
      // Query: Fetch products where the 'sellerId' matches the current user's UID
      const q = query(productsRef, where("sellerId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMyProducts(productsList);

    } catch (error) {
      console.error("Error fetching seller products:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch products when the component mounts or user changes
  useEffect(() => {
    fetchMyProducts();
  }, [currentUser]); // Re-run if currentUser changes

  const getStatusColor = (status) => {
      switch(status) {
          case 'pending': return 'orange';
          case 'approved': return 'green';
          default: return 'red';
      }
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1>📦 Seller Panel</h1>
      <RoleSwitcher />
      
      <p>Welcome, {currentUser?.email}. Manage your Excem store here.</p>
      
      <h3 style={{marginTop: '30px'}}>My Product Listings ({myProducts.length} items)</h3>
      <div style={{ border: '1px solid #ccc', padding: '20px', minHeight: '150px' }}>
        {loading && <p>Loading your products...</p>}
        {!loading && myProducts.length === 0 && <p>You have not uploaded any products yet. Use the "Sell" link to start!</p>}

        {!loading && myProducts.map((product) => (
          <div key={product.id} style={{ borderBottom: '1px dashed #eee', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{product.productName}</strong> - ${product.price}
              <p style={{ fontSize: '0.8em', color: '#666' }}>{product.description}</p>
            </div>
            <span style={{ 
                color: 'white', 
                backgroundColor: getStatusColor(product.status), 
                padding: '5px 10px', 
                borderRadius: '15px', 
                fontSize: '0.8em' 
            }}>
              {product.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
      
      <h3 style={{marginTop: '50px'}}>Order Management</h3>
      <p>Future space for viewing and processing customer orders.</p>
    </div>
  );
}

export default SellerPanel;
