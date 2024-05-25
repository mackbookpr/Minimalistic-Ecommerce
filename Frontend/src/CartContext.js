import React, { createContext, useState, useEffect, useContext } from 'react';

const cartContext = createContext();

export const useCart = () => useContext(cartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeFromCart = (id) => { // Modify to remove by item ID
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
    };

    const updateCartItemQuantity = (id, quantity) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                return { ...item, Quantity: item.Quantity + quantity, cost: item.cost + (item.price * quantity) };
            }
            return item;
        }));
    };

    return (
        <cartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity }}>
            {children}
        </cartContext.Provider>
    );
};
