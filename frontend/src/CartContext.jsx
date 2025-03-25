import React, { createContext, useContext, useState, useEffect } from "react";

// Helper functions for localStorage
const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(loadCartFromLocalStorage());

    useEffect(()=>{
        saveCartToLocalStorage(cart)     
    }, [cart])

    // Add item to cart
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                // If item already exists, update its quantity
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // If item doesn't exist, add it to the cart
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    };

    // Update item quantity in cart
    const updateQuantity = (itemId, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Clear the entire cart
    const clearCart = () => {
        setCart([]);
    };

    // Calculate the total cost of the cart
    const totalCart = () => {
        return cart.reduce((sum, item) => sum + item.productPrice * item.quantity, 0).toFixed(0);
    };

    // Calculate the total count of items in the cart
    const totalCount = () => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalCart, totalCount  }}>
            {children}
        </CartContext.Provider>
    )

}