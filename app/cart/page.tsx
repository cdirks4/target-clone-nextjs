'use client';
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
type Props = {};

export default function CartPage({}: Props) {
    const { cartProducts } = useContext(CartContext);

    return (
        <div className="m-4">
            <h1 className="font-bold text-2xl">Cart</h1>
            <h2 className="font-bold text-gray-500"> subtotal</h2>
            <div className="shadow overflow-hidden  sm:rounded-lg mt-4">
                <h2 className="font-bold ml-5">Order Pickup</h2>
                <p className="ml-5 text-xs text-gray-500">
                    {cartProducts.length} items at Woburn
                </p>
            </div>
        </div>
    );
}
