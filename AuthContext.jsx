import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig'; 
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Added signOut
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    // Simplified roles: only tracking admin status
    const [userRoles, setUserRoles] = useState({ admin: false }); 
    const [currentView, setCurrentView] = useState('customer'); // Only customer or admin view now
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setUserRoles({ admin: false }); 
            setLoading(false); 
            
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists() && userDoc.data().roles) {
                    const roles = userDoc.data().roles;
                    
                    const newRoles = {
                        admin: roles.admin || false,
                    };
                    setUserRoles(newRoles);

                    // Set the initial active view: Admin or Customer
                    if (newRoles.admin) {
                        setCurrentView('admin');
                    } else {
                        setCurrentView('customer');
                    }
                } else {
                    setCurrentView('customer');
                }
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Switch view logic simplified: only Admin and Customer
    const switchView = (role) => {
        if (role === 'admin' && userRoles.admin) {
            setCurrentView('admin');
        } else if (role === 'customer') {
            setCurrentView('customer');
        } else {
            console.warn(`Attempted switch to unauthorized role: ${role}`);
        }
    };
    
    const logout = () => {
        return signOut(auth);
    };

    const value = {
        currentUser,
        userRoles,
        isAdmin: userRoles.admin,
        currentView,            
        switchView,             
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
