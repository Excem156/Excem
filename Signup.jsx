// src/components/pages/Signup.jsx

import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'; // <--- Import Auth instance
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; // For redirecting after success

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // On successful sign-up, redirect to the Home page or Login
            navigate('/login'); 
            alert("Success! Please log in.");
        } catch (err) {
            // Firebase error codes will be in err.message
            setError(err.message);
        }
    };
    
    // ... rest of the JSX form structure (use the code provided previously) ...
    // Make sure your form's onSubmit={handleSignup}
}

export default Signup;
