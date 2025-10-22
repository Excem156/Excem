import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
import { collection, addDoc } from 'firebase/firestore'; // <-- NEW: Import Firestore functions
import { db } from '../../firebaseConfig'; // <-- NEW: Import the Firestore instance

function SellProduct() {
  const { currentUser } = useAuth();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // To prevent double submission

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!currentUser) {
        setMessage('Please log in to upload products.');
        return;
    }
    setLoading(true);
    setMessage('');

    try {
      // 1. Save product data to the 'products' collection
      await addDoc(collection(db, "products"), { 
        sellerId: currentUser.uid,
        sellerEmail: currentUser.email,
        productName: productName,
        description: description,
        price: parseFloat(price),
        status: 'pending', // The critical flag for Admin review
        isLive: false,      // Not visible to public store yet
        uploadedAt: new Date(),
      });
      
      setMessage('✅ Product uploaded successfully! It is now pending admin review before display.');
      
      // Clear the form
      setProductName('');
      setDescription('');
      setPrice('');

    } catch (error) {
      console.error("Error uploading product:", error);
      setMessage(`❌ Error uploading product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  if (!currentUser) {
      return <p>Please <a href="/login">log in</a> to sell your products.</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ddd' }}>
      <h1>Sell on Excem</h1>
      <p>Upload your product details below. Your product will be visible only after an Admin reviews and approves it.</p>
      
      <form onSubmit={handleUpload}>
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        
        <label>Price ($):</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <button type="submit" disabled={loading} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white' }}>
          {loading ? 'Submitting...' : 'Upload Product'}
        </button>
      </form>
      
      {message && <p style={{ marginTop: '15px' }}>{message}</p>}
    </div>
  );
}

export default SellProduct;
