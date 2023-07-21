'use client';
import React, { createContext, useState, useEffect } from 'react';
import { Product } from '@prisma/client';

type CartContextType = {
    cartProducts: Product[];
    addProductToCart: (productId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType>({
    cartProducts: [],
    addProductToCart: () => Promise.resolve(),
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
            const products = await cartResponse.json();
            setCartProducts(products);
        };
        fetchCartProducts();
    }, []);

    const addProductToCart = async (productId: string): Promise<void> => {
        try {
            const updatedCartResponse = await fetch(`/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });
            const { products } = await updatedCartResponse.json();
            setCartProducts(products);
            return;
        } catch (error) {
            console.error(
                'An error occurred while adding the product to cart:',
                error
            );
        }
    };

    return (
        <CartContext.Provider value={{ cartProducts, addProductToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
