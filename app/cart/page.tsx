'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';
type Props = {};

export default function CartPage({}: Props) {
    const { cartProducts } = useContext(CartContext);

    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
        productId: string
    ) => {
        const newQuantity = parseInt(event.target.value);
        console.log(event, productId);
        // Update the quantity of the product in the cart context or make an API call to update the quantity on the server
    };

    return (
        <div className="m-4">
            <h1 className="font-bold text-2xl">Cart</h1>
            <h2 className="font-bold text-gray-500">
                $
                {cartProducts.reduce(
                    (accumulator, product) => accumulator + product.price,
                    0
                )}{' '}
                subtotal · {cartProducts.length} item(s)
            </h2>
            <div className="shadow overflow-hidden sm:rounded-lg mt-4">
                <div className="flex w-max-full border-slate-300 border-b ml-4 mr-4">
                    <Image
                        className="m-4 ml-0"
                        src={
                            'https://target.scene7.com/is/image/Target/GUEST_afff1972-2eb2-4633-814c-ddd5fa866308'
                        }
                        width={30}
                        height={30}
                        alt={`Target Pickup Image`}
                    />
                    <div className="mt-2 ">
                        <h2 className="font-bold">Order Pickup</h2>
                        <p className="text-xs text-gray-500 ">
                            {cartProducts.length} item(s) at Woburn
                        </p>
                    </div>
                </div>
                {cartProducts.map((product, index) => {
                    console.log(product.images[0]);
                    return (
                        <div
                            className="flex"
                            key={`product-cover-art-${index}`}
                        >
                            <Image
                                className="rounded-full m-2"
                                key={`product-cover-art-${index}`}
                                src={product.images[0]}
                                alt={`Image ${index + 1}`}
                                width={80}
                                height={80}
                            />
                            <div>
                                <h2 className="text-xs text-gray-800">
                                    ${product.price}
                                </h2>
                                <h2 className="text-xs text-gray-500">
                                    {product.title}
                                </h2>
                                <select
                                    className="border-gray-400 text-gray-400 rounded-sm border cursor-pointer text-[10px] p-1"
                                    value={`Qty }`}
                                    onChange={(event) =>
                                        handleQuantityChange(event, product.id)
                                    }
                                >
                                    {Array.from(Array(10).keys()).map(
                                        (value) => (
                                            <option
                                                key={`Qty ${value}`}
                                                value={`Qty ${value + 1}`}
                                            >
                                                Qty {value + 1}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-2">
                <h2 className="font-bold text-lg border-gray-400 border-b">
                    Order Summary
                </h2>
                <p className="text-xs text-gray-500">Subtotal 3 item(s)</p>
            </div>
        </div>
    );
}
