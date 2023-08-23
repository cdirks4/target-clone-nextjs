'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import recieptPNG from '.././images/—Pngtree—vector receipt icon_3783276.png';
export default function CartPage() {
    const { cartProducts } = useContext(CartContext);

    return (
        <div className="m-4  justify-center flex gap-2">
            <div className="w-[425px]  shadow overflow-hidden rounded-lg mt-4">
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
            </div>
        </div>
    );
}

interface OrderPickupSectionProps {
    components: JSX.Element[];
}

// const OrderCheckoutSection: React.FC<OrderPickupSectionProps> = ({
//     checkoutProducts,
//     sectionTitle
// }) => {
//     return (
//         <div className="shadow overflow-hidden sm:rounded-lg mt-4 ">
//             {components.map((component, index) => (
//                 <div key={`${index}-componet`} className={`border`}>
//                     {component}
//                 </div>
//             ))}
//         </div>
//     );
// };
