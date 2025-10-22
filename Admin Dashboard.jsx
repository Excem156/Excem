import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RoleSwitcher from '../RoleSwitcher'; 
// import { db } from '../../firebaseConfig'; // For future database queries

function AdminDashboard() {
  const { currentUser } = useAuth();
  
  // Future state for pending products: 
  // const [pendingProducts, setPendingProducts] = useState([]);
  
  // Future effect to fetch pending products:
  /*
  useEffect(() => {
    const fetchPending = async () => {
      // Logic to fetch documents where status === 'pending'
      // setPendingProducts(fetchedDocs);
    };
    fetchPending();
  }, []);
  */
  
  const handleApprove = (productId) => {
    // Logic to update product status from 'pending' to 'approved'
    console.log(`Product ${productId} approved and moved to public listings.`);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h1>👑 Admin Dashboard</h1>
      <RoleSwitcher /> 
      
      <p>Welcome, {currentUser?.email}. Use this panel to manage platform integrity.</p>
      
      <h3 style={{marginTop: '30px'}}>Product Approval Queue</h3>
      <div style={{ border: '1px solid #ccc', padding: '20px', minHeight: '150px' }}>
        {/* Map through pendingProducts here */}
        <p>Display **Pending Products** here.</p>
        <button onClick={() => handleApprove('P123')} style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
          Approve Test Item
        </button>
      </div>
      
      <h3 style={{marginTop: '30px'}}>Payment Confirmation</h3>
      <p>Mark received payments from sellers here.</p>
      {/* ... Payment logic ... */}
    </div>
  );
}

export default AdminDashboard;
