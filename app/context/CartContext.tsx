'use client';
import React, { createContext, useState, useEffect } from 'react';
import { OrderType, Product } from '@prisma/client';

interface ProductWithQuantity extends Product {
    quantity: number;
    orderType: OrderType;
}
type CartContextType = {
    cartProducts: ProductWithQuantity[];
    addProductToCart: (
        productId: string,
        quantity: number,
        orderType: OrderType
    ) => Promise<void | string>;
};

const CartContext = createContext<CartContextType>({
    cartProducts: [],
    addProductToCart: () => Promise.resolve(),
});

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cartProducts, setCartProducts] = useState<ProductWithQuantity[]>([]);

    useEffect(() => {
        const fetchCartProducts = async () => {
            const cartResponse = await fetch('/api/cart', {
                method: 'GET',
            });
            const products = await cartResponse.json();
            console.log(products);
            if (products.error) {
                setCartProducts([]);
            } else {
                setCartProducts(products);
            }
        };
        fetchCartProducts();
    }, []);

    const addProductToCart = async (
        productId: string,
        quantity: number,
        orderType: OrderType
    ): Promise<string | void> => {
        try {
            const updatedCartResponse = await fetch(`/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity, orderType }),
            });
            const products = await updatedCartResponse.json();
            if (products.error) {
                return 'Please sign in';
            }
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
