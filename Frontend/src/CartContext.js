import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';

const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const { userID } = useAuth();
    const [itemsAdded, setItemsAdded] = useState(false);
    const [itemsRemoved, setItemsRemoved] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState(1);

    useEffect(() => {
        setItemsAdded(false);
        setItemsRemoved(false);
    }, []);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/cart/${userID}`);
                setCartItems(response.data.cartsObject);
                setQuantity(response.data.quantity);
                setCost(response.data.price * quantity);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchCart();
    }, [userID, quantity, itemsAdded, itemsRemoved]);

    return (
        <cartContext.Provider value={{ itemsAdded, setItemsAdded, itemsRemoved, setItemsRemoved, cartItems, setCartItems, quantity, setQuantity, cost, setCost }}>
            {children}
        </cartContext.Provider>
    );
}

export const useCart = () => {
    return useContext(cartContext);
};