import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; 
// import { collection, addDoc } from 'firebase/firestore'; // For future database logic
// import { db } from '../../firebaseConfig'; 

function SellProduct() {
  const { currentUser } = useAuth();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    // --- FUTURE: Database Submission Logic ---
    /*
    try {
      // 1. Save product data to a 'pending_products' collection
      await addDoc(collection(db, "pending_products"), {
        sellerId: currentUser.uid,
        productName,
        description,
        price: parseFloat(price),
        status: 'pending', // The critical flag for Admin approval
        uploadedAt: new Date(),
      });
      setMessage('Product uploaded successfully! It is now pending admin review before display.');
      setProductName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      setMessage('Error uploading product: ' + error.message);
    }
    */
    
    // Placeholder message for now:
    console.log(`Product "${productName}" submitted by ${currentUser.email}`);
    setMessage('Product uploaded successfully! It is now pending admin review before display.');

  };
  
  if (!currentUser) {
      return <p>Please <a href="/login">log in</a> to sell your products.</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ddd' }}>
      <h1>Sell on Excem</h1>
      <p>Upload your product details below. Your product will be visible only after an Admin reviews and approves it.</p>
      
      <form onSubmit={handleUpload}>
        {/* Input fields for product details */}
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white' }}>
          Upload Product
        </button>
      </form>
      
      {message && <p style={{ marginTop: '15px', color: 'green' }}>{message}</p>}
    </div>
  );
}

export default SellProduct;
