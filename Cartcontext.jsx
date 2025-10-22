import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext'; // To get currentUser
import { db } from '../firebaseConfig'; // To access Firestore
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { currentUser, loading: authLoading } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unsubscribeCart, setUnsubscribeCart] = useState(null);

    // --- Firestore Operations ---
    const getCartRef = (uid) => doc(db, 'carts', uid);

    // Function to save the current cart state to Firestore
    const saveCartToFirestore = async (items) => {
        if (!currentUser) return;
        try {
            await setDoc(getCartRef(currentUser.uid), { items }, { merge: true });
        } catch (error) {
            console.error("Error saving cart to Firestore:", error);
        }
    };

    // --- State Management Functions ---

    // 1. Add/Update item in cart
    const addItemToCart = async (product) => {
        const itemIndex = cartItems.findIndex(item => item.productId === product.productId);
        let newItems;

        if (itemIndex > -1) {
            // Item exists, increase quantity
            newItems = cartItems.map((item, index) => 
                index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            // New item, add to cart
            const newItem = {
                productId: product.productId,
                productName: product.productName,
                price: product.price,
                sellerId: product.sellerId, // Important for checkout
                quantity: 1,
            };
            newItems = [...cartItems, newItem];
        }
        setCartItems(newItems);
        await saveCartToFirestore(newItems);
    };

    // 2. Remove item from cart
    const removeItemFromCart = async (productId) => {
        const newItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(newItems);
        await saveCartToFirestore(newItems);
    };

    // 3. Clear the entire cart
    const clearCart = async () => {
        setCartItems([]);
        await saveCartToFirestore([]);
    };

    // --- Real-Time Listener (Firestore Subscription) ---
    useEffect(() => {
        // Clear any previous listener
        if (unsubscribeCart) {
            unsubscribeCart();
            setUnsubscribeCart(null);
        }

        if (!authLoading && currentUser) {
            const cartRef = getCartRef(currentUser.uid);
            
            // Set up real-time listener
            const unsubscribe = onSnapshot(cartRef, (docSnap) => {
                if (docSnap.exists() && docSnap.data().items) {
                    setCartItems(docSnap.data().items);
                } else {
                    setCartItems([]);
                }
                setLoading(false);
            }, (error) => {
                console.error("Error fetching cart data:", error);
                setLoading(false);
            });

            setUnsubscribeCart(() => unsubscribe);
        } else if (!authLoading && !currentUser) {
            // If logged out, reset cart state to empty
            setCartItems([]);
            setLoading(false);
        }

        return () => {
            if (unsubscribeCart) {
                unsubscribeCart();
            }
        };
    }, [currentUser, authLoading]);


    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const value = {
        cartItems,
        totalItems,
        totalPrice,
        loading,
        addItemToCart,
        removeItemFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
