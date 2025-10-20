import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Welcome to EXCEM 🌍</h1>
      <p>Your trusted marketplace for buying and selling safely worldwide.</p>

      <div style={{ marginTop: '20px' }}>
        <Link
          to="/shop"
          style={{
            backgroundColor: '#0c9248',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Go to Shop
        </Link>
      </div>
    </div>
  );
}

export default Home;
