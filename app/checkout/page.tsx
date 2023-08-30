'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import recieptPNG from '.././images/—Pngtree—vector receipt icon_3783276.png';
import creditCardPNG from '.././images/pngegg.png';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
export default function CartPage() {
    const { cartProducts } = useContext(CartContext);
    const { push } = useRouter();
    const { user } = useUser();
    const attemptStripePayment = async () => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartProducts: cartProducts,
                }),
            });
            const { url } = await response.json();
            push(url);
        } catch (error) {}
    };
    return (
        <div className="m-4  justify-center flex gap-2">
            <div className="w-[425px]">
                <div className=" shadow overflow-hidden rounded-lg mt-4">
                    <div className="flex border-slate-300 border-b ml-4 mr-4">
                        <ShoppingCartIcon className="text-red-600 h-8 m-2"></ShoppingCartIcon>
                        <div>
                            <h1 className="font-bold mt-2">Cart</h1>
                            <p className="text-gray-500 text-xs">
                                $
                                {cartProducts
                                    ?.reduce(
                                        (accumulator, product) =>
                                            accumulator + product.price,
                                        0
                                    )
                                    .toFixed(2)}{' '}
                                total ·
                            </p>
                        </div>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-green-600 text-sm">
                            {' '}
                            Ready within 2 hours
                        </h2>
                        <h3 className="text-xs text-gray-500">at Woburn</h3>
                        <div className="flex flex-wrap ">
                            {cartProducts.map((prod) => (
                                <Image
                                    key={`checkout-item-${prod.title}-${prod.id}`}
                                    src={prod.images[0]}
                                    height={50}
                                    width={50}
                                    alt={`${prod.title} checkout image`}
                                ></Image>
                            ))}
                        </div>
                    </div>
                </div>
                <div className=" shadow overflow-hidden rounded-lg mt-4">
                    <div className="flex border-slate-300 border-b ml-4 mr-4">
                        <Image
                            className="m-2"
                            src={creditCardPNG}
                            height={30}
                            alt={`Image `}
                        ></Image>
                        <h1 className="font-bold mt-2 ">Payment</h1>
                    </div>
                </div>
            </div>
            <div className="shadow overflown-hidden rounded-lg mt-4 w-[300px]">
                <div className="flex border-b border-slate-300 ml-4 mr-4">
                    <Image
                        className="m-2 ml-0"
                        src={recieptPNG}
                        height={30}
                        alt={`Image `}
                    ></Image>
                    <h1 className="font-bold mt-2 text-gray-800">
                        Order Summary
                    </h1>
                </div>
                <div className="ml-4 mr-4 mt-2 flex justify-between">
                    <h2 className="text-gray-700 text-xs">
                        Subtotal {cartProducts.length} item(s)
                    </h2>
                    <h2 className="text-gray-700 text-xs">
                        $
                        {cartProducts
                            ?.reduce(
                                (accumulator, product) =>
                                    accumulator + product.price,
                                0
                            )
                            .toFixed(2)}
                    </h2>
                </div>
                <div className="border-b border-slate-300 ml-4 mr-4">
                    <div className="mt-2 flex justify-between">
                        <h2 className="text-gray-700 text-xs">Delivery</h2>
                        <h2 className="text-gray-700 text-xs text-red-600">
                            Free
                        </h2>
                    </div>
                    <div className="mt-2 flex justify-between mb-2">
                        <h2 className="text-gray-700 text-xs">Regional Fees</h2>
                        <h2 className="text-gray-700 text-xs ">$1.00</h2>
                    </div>
                    <div className="mt-2 flex justify-between mb-2">
                        <h2 className="text-gray-700 text-xs">
                            Estimated Taxes
                        </h2>
                        <h2 className="text-gray-700 text-xs ">
                            $
                            {
                                //@ts-ignore
                                cartProducts
                                    ?.reduce(
                                        (accumulator, product) =>
                                            accumulator + product.price,
                                        0
                                    )
                                    .toFixed(2) * 0.0625
                            }
                        </h2>
                    </div>
                </div>
                <div className="border-b border-slate-300  flex justify-between m-4">
                    <h2 className="font-bold mb-4 text-gray-800">Total</h2>
                    <h2 className="font-bold text-gray-800">
                        $
                        {cartProducts
                            ?.reduce(
                                (accumulator, product) =>
                                    accumulator + product.price,
                                0
                            )
                            .toFixed(2)}
                    </h2>
                </div>
                <div className="m-4">
                    <button
                        className={`bg-red-700 text-white rounded text-[10px] min-h-[30px] p-1 font-bold w-full h-full`}
                        onClick={attemptStripePayment}
                    >
                        Place your order
                    </button>
                </div>
                <p className="text-gray-500 text-center m-2 ml-6 mr-6   text-[10px]">
                    Order confirmation and updates will be emailed to{' '}
                    {user?.emailAddresses[0].emailAddress}
                </p>
            </div>
        </div>
    );
}

interface OrderPickupSectionProps {
    components: JSX.Element[];
}
