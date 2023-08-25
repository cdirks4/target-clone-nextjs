'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import recieptPNG from '.././images/—Pngtree—vector receipt icon_3783276.png';
import creditCardPNG from '.././images/pngegg.png';
import { useRouter } from 'next/navigation';
export default function CartPage() {
    const { cartProducts } = useContext(CartContext);
    const { push } = useRouter();

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
                <div className="flex">
                    <Image
                        className="m-2"
                        src={recieptPNG}
                        height={30}
                        alt={`Image `}
                    ></Image>
                    <h1 className="font-bold mt-2">Order Summary</h1>
                </div>
                <button
                    className={`bg-red-700 text-white rounded text-[10px] min-h-[30px] p-1 font-bold w-full h-full `}
                    onClick={attemptStripePayment}
                >
                    {' '}
                    Place your order
                </button>
            </div>
        </div>
    );
}

interface OrderPickupSectionProps {
    components: JSX.Element[];
}
