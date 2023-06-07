'use client';
import React, { createContext, useState, useEffect } from 'react';
import { Product } from '@prisma/client';

type CartContextType = {
    cartProducts: Product[];
    addToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextType>({
    cartProducts: [],
    addToCart: () => {},
});

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCartProducts = async () => {
            const cartResponse = await fetch('/api/cart', {
                method: 'GET',
            });
            const { products } = await cartResponse.json();
            setCartProducts(products);
        };
        fetchCartProducts();
    }, []);

    const addToCart = async (product: Product) => {};

    return (
        <CartContext.Provider value={{ cartProducts, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
