import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { 
  getFirestore, 
  // Firestore functions will be added in the next step
} from 'firebase/firestore';

// --- FIREBASE SETUP ---
let db, auth;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Utility function to handle messages (instead of alert/confirm)
const showMessage = (msg, type = 'info') => {
  console.log(`[${type.toUpperCase()}]: ${msg}`);
};


// --- FIREBASE & AUTH CONTEXT ---
const AuthContext = React.createContext();

const FirebaseInitializer = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // 1. Initialize Firebase App and Services
      const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
      const app = initializeApp(firebaseConfig);
      db = getFirestore(app);
      auth = getAuth(app);
      
      // 2. Handle Initial Authentication (Custom Token or Anonymous)
      const authenticateUser = async () => {
        try {
          if (typeof __initial_auth_token !== 'undefined') {
            await signInWithCustomToken(auth, __initial_auth_token);
          } else {
            await signInAnonymously(auth); 
          }
        } catch (error) {
          console.error("Auth failed:", error);
          await signInAnonymously(auth); // Fallback to anonymous sign-in
        }
      };

      authenticateUser();

      // 3. Set up Auth State Listener (Crucial for managing user sessions)
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        console.log(`User state changed. UID: ${currentUser ? currentUser.uid : 'null'}`); 
      });

      return () => unsubscribe();
      
    } catch (e) {
      console.error("Firebase initialization error:", e);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, auth, db }}>
      {children}
    </AuthContext.Provider>
  );
};


// --- LOGIN COMPONENT ---

const Login = ({ setView }) => {
  const { auth, user } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect logged-in users
  useEffect(() => {
    if (user && !user.isAnonymous) {
      setView('home');
    }
  }, [user, setView]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage('Login successful! Redirecting...', 'success');
    } catch (err) {
      console.error("Login error:", err);
      // Clean up the error message for the user
      setError(err.message.replace('Firebase: Error (auth/', '').replace(').', '').replace(/-/g, ' '));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[500px] p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign In to Excem</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com" 
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********" 
              required 
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 disabled:opacity-50" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <a onClick={() => setView('signup')} className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800 cursor-pointer">
              Don't have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- SIGNUP COMPONENT ---

const Signup = ({ setView }) => {
  const { auth } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // User is automatically logged in after sign up
      showMessage('Account created successfully! Redirecting to home...', 'success');
      setView('home'); 
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message.replace('Firebase: Error (auth/', '').replace(').', '').replace(/-/g, ' '));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[500px] p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Excem Account</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm font-medium">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input 
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com" 
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******** (min 6 chars)" 
              required 
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 disabled:opacity-50" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register Account'}
            </button>
            <a onClick={() => setView('login')} className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800 cursor-pointer">
              Already have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- HOMEPAGE COMPONENT ---

const Home = ({ setView }) => {
  const { user } = React.useContext(AuthContext);
  const displayName = user && !user.isAnonymous ? (user.email.split('@')[0]) : 'Guest';
  
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-[500px]">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-gray-600 mb-4">
          Status: Logged in as <span className="font-semibold text-red-600">{displayName}</span>
        </p>
        
        {/* Hero Banner */}
        <section className="bg-red-600 text-white rounded-xl shadow-lg p-6 sm:p-12 mb-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3">
            EXCEM: Shop Everything, Everywhere!
          </h1>
          <p className="text-lg mb-6">Massive discounts on millions of products. Start exploring now.</p>
          {!user || user.isAnonymous ? (
             <button 
                onClick={() => setView('signup')} 
                className="bg-white text-red-600 font-bold py-3 px-8 rounded-full shadow-xl hover:bg-red-100 transition duration-300"
              >
                Sign Up & Save Today
            </button>
          ) : (
            <p className="text-xl font-bold">Welcome back, {displayName}! Find your next deal below.</p>
          )}
        </section>

        {/* Product Placeholder Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Top Deals</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-[1.02] duration-300">
                <div className="h-32 sm:h-48 bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-sm">
                  Product Image {i}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-lg font-semibold truncate">Amazing Item Name {i}</h3>
                  <p className="text-red-500 font-bold text-lg sm:text-xl mt-1 mb-2">$49.{i}9</p>
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg text-xs sm:text-sm hover:bg-red-600 transition duration-150">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};


// --- HEADER COMPONENT ---

const Header = ({ setView }) => {
  const { user, loading } = React.useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showMessage('Logged out successfully.', 'info');
      setView('home'); // Ensure view resets after logout
    } catch (error) {
      console.error("Logout error:", error);
      showMessage('Logout failed.', 'error');
    }
  };

  // Display 'Loading' while Firebase is initializing
  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-md p-4 text-center">
        <p className="text-gray-500">Initializing Firebase...</p>
      </header>
    );
  }

  const isLoggedIn = user && !user.isAnonymous;
  const userDisplayName = isLoggedIn ? user.email.split('@')[0] : 'Guest';

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto p-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Logo/Brand Name */}
        <div className="logo cursor-pointer" onClick={() => setView('home')}>
          <span className="text-3xl font-extrabold text-red-600">EXCEM</span>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl w-full sm:w-auto">
          <div className="flex border-2 border-red-500 rounded-full overflow-hidden shadow-inner">
            <input 
              type="text" 
              placeholder="Search for millions of products..." 
              className="w-full py-2 px-4 text-gray-700 focus:outline-none text-sm" 
            />
            <button className="bg-red-500 text-white px-4 hover:bg-red-600 transition duration-150">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-2 items-center">
          {isLoggedIn ? (
            <>
              <span className="text-sm font-medium text-gray-700 hidden md:inline">Hi, {userDisplayName}!</span>
              <button 
                onClick={handleLogout}
                className="px-3 py-1 text-sm font-medium rounded-full text-white bg-gray-500 hover:bg-gray-600 transition duration-150"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setView('login')}
                className="px-3 py-1 text-sm font-medium rounded-full text-gray-600 hover:text-red-600 hover:bg-gray-100 transition duration-150"
              >
                Sign In
              </button>
              <button
                onClick={() => setView('signup')}
                className="px-3 py-1 text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition duration-150"
              >
                Register
              </button>
            </>
          )}
          
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition duration-150">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="ml-1 text-sm font-semibold hidden sm:inline">Cart (0)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};


// --- MAIN APP RENDER ---

const AppContent = () => {
  const { loading } = React.useContext(AuthContext);
  const [view, setView] = useState('home'); 

  // Handles which page to display based on the 'view' state
  const renderView = () => {
    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Excem Marketplace...</p>
        </div>
      );
    }

    switch (view) {
      case 'home':
        return <Home setView={setView} />;
      case 'login':
        return <Login setView={setView} />;
      case 'signup':
        return <Signup setView={setView} />;
      default:
        return (
          <div className="text-center p-20">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <button onClick={() => setView('home')} className="mt-6 text-red-600 font-semibold underline">Go to Home</button>
          </div>
        );
    }
  };

  return (
    <>
      <Header setView={setView} />
      <main className="pb-10">
        {renderView()}
      </main>
      
      {/* Simple Footer */}
      <footer className="bg-gray-800 text-white p-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Excem Marketplace. All rights reserved. App ID: {appId}</p>
        <div className="mt-2 text-gray-400">
          Privacy Policy | Terms of Service
        </div>
      </footer>
    </>
  );
}

// The root component that initializes Firebase and wraps the entire application
const App = () => (
  // Load Tailwind CSS script and set global styles
  <>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      {/* Custom font preference and body styling */}
      {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #f4f4f4; }
      `}
    </style>
    <FirebaseInitializer>
      <AppContent />
    </FirebaseInitializer>
  </>
);

export default App;
