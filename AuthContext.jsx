// src/contexts/AuthContext.jsx

// ... (Existing imports) ...
import { signOut } from 'firebase/auth'; // <-- NEW IMPORT

// ... (Existing code for AuthProvider component) ...

export const AuthProvider = ({ children }) => {
    // ... (Existing state and useEffect) ...

    // ADD THIS LOGOUT FUNCTION
    const logout = () => {
        return signOut(auth);
    };

    const value = {
        currentUser,
        userRoles,
        isAdmin: userRoles.admin,
        isSeller: userRoles.seller,
        currentView,            
        switchView,             
        logout, // <-- EXPORT THE NEW FUNCTION
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
