'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';
import { OrderType, Product } from '@prisma/client';

export default function CartPage() {
    const { cartProducts } = useContext(CartContext);

    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
        productId: string
    ) => {
        const newQuantity = parseInt(event.target.value);
    };

    const filterProductsByOrderType = (orderType: OrderType) => {
        return cartProducts.filter(
            (product) => product.orderType === orderType
        );
    };

    const pickupProducts = filterProductsByOrderType(OrderType.PICKUP);
    const deliveryProducts = filterProductsByOrderType(OrderType.DELIVERY);
    const shippingProducts = filterProductsByOrderType(OrderType.SHIPPING);

    return (
        <div className="m-4">
            <h1 className="font-bold text-2xl">Cart</h1>
            <h2 className="font-bold text-gray-500">
                $
                {cartProducts?.reduce(
                    (accumulator, product) => accumulator + product.price,
                    0
                )}{' '}
                subtotal · {cartProducts.length} item(s)
            </h2>
            {pickupProducts.length > 0 && (
                <OrderCheckoutSection
                    orderTitle="Order Pickup"
                    checkoutItems={pickupProducts}
                    handleQuantityChange={handleQuantityChange}
                />
            )}
            {deliveryProducts.length > 0 && (
                <OrderCheckoutSection
                    orderTitle="Delivery"
                    checkoutItems={deliveryProducts}
                    handleQuantityChange={handleQuantityChange}
                />
            )}{' '}
            {shippingProducts.length > 0 && (
                <OrderCheckoutSection
                    orderTitle="Shipping"
                    checkoutItems={shippingProducts}
                    handleQuantityChange={handleQuantityChange}
                />
            )}
        </div>
    );
}

interface ProductWithQuantity extends Product {
    orderType: OrderType;
    quantity: number;
}

interface OrderPickupSectionProps {
    orderTitle: string;
    checkoutItems: ProductWithQuantity[];
    handleQuantityChange: (
        event: React.ChangeEvent<HTMLSelectElement>,
        productId: string
    ) => void;
}

const OrderCheckoutSection: React.FC<OrderPickupSectionProps> = ({
    orderTitle,
    checkoutItems,
    handleQuantityChange,
}) => {
    return (
        <div className="shadow overflow-hidden sm:rounded-lg mt-4">
            <div className="flex w-max-full border-slate-300 border-b ml-4 mr-4">
                <Image
                    className="m-4 ml-0"
                    src="https://target.scene7.com/is/image/Target/GUEST_afff1972-2eb2-4633-814c-ddd5fa866308"
                    width={30}
                    height={30}
                    alt={`Target Pickup Image`}
                />
                <div className="mt-2">
                    <h2 className="font-bold">{orderTitle}</h2>
                    <p className="text-xs text-gray-500">
                        {checkoutItems.length} item(s) at Woburn
                    </p>
                </div>
            </div>
            {checkoutItems.map((product, index) => (
                <div
                    className="flex border-b ml-2 mr-2"
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
                    <div className="mt-2 max-w-xs">
                        <h2 className="text-xs text-gray-500">
                            {product.title}
                        </h2>
                        <select
                            className="border-gray-500 text-gray-600 rounded-sm border cursor-pointer text-[10px] p-1"
                            value={`Qty ${product.quantity}`}
                            onChange={(event) =>
                                handleQuantityChange(event, product.id)
                            }
                        >
                            {Array.from(Array(10).keys()).map((value) => (
                                <option
                                    key={`Qty ${value}`}
                                    value={`Qty ${value + 1}`}
                                >
                                    Qty {value + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <h2 className="text-xs text-gray-800">${product.price}</h2>
                </div>
            ))}

            <div className="flex ml-2 mt-2 mb-2 justify-between">
                <div>
                    <h3 className="font-bold text-xs ">
                        {checkoutItems.length} item(s)
                    </h3>
                    <p className="text-xs text-gray-500">Order Pickup</p>
                </div>
                <button className="bg-red-700 text-white rounded min-h-[30px] w-[200px] font-bold w-full h-full text-xs ">
                    Checkout Order Pickup item
                </button>
            </div>
        </div>
    );
};
