import React, { createContext, useContext, useEffect, useState } from 'react';
// Ensure this path correctly points to your firebaseConfig file
import { auth, db } from '../firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRoles, setUserRoles] = useState({ admin: false, seller: false });
    const [currentView, setCurrentView] = useState('customer'); // Default view
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setUserRoles({ admin: false, seller: false }); 
            setLoading(false); // Assume done if no user
            
            if (user) {
                // Fetch the user's custom roles from the Firestore 'users' collection
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists() && userDoc.data().roles) {
                    const roles = userDoc.data().roles;
                    
                    const newRoles = {
                        admin: roles.admin || false,
                        seller: roles.seller || false
                    };
                    setUserRoles(newRoles);

                    // Set the initial active view: Admin > Seller > Customer (default)
                    if (newRoles.admin) {
                        setCurrentView('admin');
                    } else if (newRoles.seller) {
                        setCurrentView('seller');
                    } else {
                        setCurrentView('customer');
                    }
                }
            }
            setLoading(false);
        });

        return unsubscribe; // Cleanup subscription
    }, []);

    // Function to allow the user to switch their active view (called by RoleSwitcher)
    const switchView = (role) => {
        if (role === 'admin' && userRoles.admin) {
            setCurrentView('admin');
        } else if (role === 'seller' && userRoles.seller) {
            setCurrentView('seller');
        } else if (role === 'customer') {
            setCurrentView('customer');
        } else {
            console.warn(`Attempted switch to unauthorized role: ${role}`);
        }
    };

    const value = {
        currentUser,
        userRoles,
        isAdmin: userRoles.admin,
        isSeller: userRoles.seller,
        currentView,            
        switchView,             
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
