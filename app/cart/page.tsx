'use client';
import React, { useContext, ChangeEvent } from 'react';
import Image from 'next/image';
import { CartContext } from '../context/CartContext';
import { OrderType, Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
export default function CartPage() {
    const { cartProducts } = useContext(CartContext);

    const filterProductsByOrderType = (orderType: OrderType) => {
        return cartProducts.filter(
            (product) => product.orderType === orderType
        );
    };

    const pickupProducts = filterProductsByOrderType(OrderType.PICKUP);
    const deliveryProducts = filterProductsByOrderType(OrderType.DELIVERY);
    const shippingProducts = filterProductsByOrderType(OrderType.SHIPPING);

    return (
        <div className="m-4 grid justify-center">
            <h1 className="font-bold text-2xl">Cart</h1>
            <h2 className="font-bold text-gray-500">
                $
                {cartProducts
                    ?.reduce(
                        (accumulator, product) => accumulator + product.price,
                        0
                    )
                    .toFixed(2)}{' '}
                subtotal · {cartProducts.length} item(s)
            </h2>
            {pickupProducts.length > 0 && (
                <OrderCheckoutSection
                    orderType={OrderType.PICKUP}
                    orderTitle="Order Pickup"
                    orderCheckoutTitle="Order Pickup"
                    checkoutItems={pickupProducts}
                />
            )}
            {deliveryProducts.length > 0 && (
                <OrderCheckoutSection
                    orderType={OrderType.DELIVERY}
                    orderTitle="Delivery"
                    orderCheckoutTitle="Order Delivery"
                    checkoutItems={deliveryProducts}
                />
            )}{' '}
            {shippingProducts.length > 0 && (
                <OrderCheckoutSection
                    orderType={OrderType.SHIPPING}
                    orderTitle="Shipping"
                    orderCheckoutTitle="Order Shipping"
                    checkoutItems={shippingProducts}
                />
            )}
        </div>
    );
}

interface ProductWithQuantity extends Product {
    orderType: OrderType;
    quantity: number;
}

interface OrderCheckoutSectionProps {
    orderType: OrderType;
    orderTitle: string;
    orderCheckoutTitle: string;
    checkoutItems: ProductWithQuantity[];
}

const OrderCheckoutSection: React.FC<OrderCheckoutSectionProps> = ({
    orderType,
    orderTitle,
    checkoutItems,
    orderCheckoutTitle,
}) => {
    const { push } = useRouter();
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
                <CheckoutItem
                    key={`product-checkout-item-${product.id}`}
                    product={product}
                />
            ))}

            <div className="flex ml-2 mt-2 mb-2 justify-between">
                <div>
                    <h3 className="font-bold text-xs ">
                        {checkoutItems.length} item(s)
                    </h3>
                    <p className="text-xs text-gray-500">
                        {orderCheckoutTitle}
                    </p>
                </div>
                <button
                    className="bg-red-700 text-white rounded min-h-[30px] max-w-[25%] font-bold w-full h-full text-xs mr-2"
                    onClick={() => push(`/checkout/${orderType}`)}
                >
                    Checkout {orderCheckoutTitle} item
                </button>
            </div>
        </div>
    );
};

interface CheckoutItemProps {
    product: ProductWithQuantity;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ product }) => {
    const { addProductToCart, removeProductFromCart } = useContext(CartContext);
    const handleUpdatingProduct = async (
        event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        productId: string,
        orderType: OrderType
    ) => {
        if (event.target.type === 'radio') {
            await addProductToCart(productId, product.quantity, orderType);
        } else {
            const newQuantity = parseInt(event.target.value, 10);
            await addProductToCart(productId, newQuantity, orderType);
        }
    };
    const getTwoDaysFromDate = () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 2);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        };
        return currentDate.toLocaleDateString('en-US', options);
    };
    return (
        <div
            className="relative border-b ml-2  mr-4 flex"
            key={`product-cover-art-${product.id}`}
        >
            <div className="flex m-2 min-w-full">
                <Image
                    alt="primary-product-photo"
                    className="rounded-full "
                    src={product.images[0]}
                    width={80}
                    height={80}
                />
                <div className="w-[40%]">
                    <h2 className="text-xs  w-[94%] ">{product.title}</h2>
                    <select
                        key={`select-${product.id}`}
                        className="border-gray-500 text-gray-600 rounded-sm border cursor-pointer text-[10px] p-1 mt-2 mb-2"
                        defaultValue={product.quantity}
                        onChange={(event) =>
                            handleUpdatingProduct(
                                event,
                                product.id,
                                product.orderType
                            )
                        }
                    >
                        {Array.from(Array(10).keys()).map((value) => (
                            <option key={`Qty ${value + 1}`} value={value + 1}>
                                Qty {value + 1}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid">
                    <label
                        className="inline-flex items-center mr-2 cursor-pointer"
                        htmlFor={`radio-pickup-${product.id}`}
                    >
                        <span className=" mr-2 flex justify-center items-center">
                            <input
                                id={`radio-pickup-${product.id}`}
                                type="radio"
                                name={`radio-${product.id}`}
                                defaultChecked={
                                    product.orderType === OrderType.SHIPPING
                                }
                                value={OrderType.SHIPPING}
                                className="absolute"
                                onChange={(event) =>
                                    handleUpdatingProduct(
                                        event,
                                        product.id,
                                        event.target.value as OrderType
                                    )
                                }
                            />
                        </span>
                        <span className="text-xs ">
                            Standard Shipping
                            <p className="text-green-700 text-[10px]">
                                Get it by {getTwoDaysFromDate()}
                            </p>
                        </span>
                    </label>
                    <label
                        className="inline-flex items-center mr-2 cursor-pointer"
                        htmlFor={`radio-shipping-${product.id}`}
                    >
                        <span className="mr-2 flex flex-shrink-0 justify-center items-center">
                            <input
                                id={`radio-shipping-${product.id}`}
                                type="radio"
                                name={`radio-${product.id}`}
                                defaultChecked={
                                    product.orderType === OrderType.PICKUP
                                }
                                value={OrderType.PICKUP}
                                className="absolute"
                                onChange={(event) =>
                                    handleUpdatingProduct(
                                        event,
                                        product.id,
                                        event.target.value as OrderType
                                    )
                                }
                            />
                        </span>
                        <span className="text-xs ">
                            Order Pickup{' '}
                            <p className="text-green-700 text-[10px]">
                                Ready tomorrow
                            </p>
                        </span>
                    </label>
                </div>
                <div className="flex-grow"></div>{' '}
                <h2 className="mt-2 text-xs text-gray-800 font-bold">
                    ${product.price}
                </h2>
                <button
                    className="ml-4 mr-2 font-extralight h-6"
                    onClick={() => removeProductFromCart(product.id)}
                >
                    X
                </button>
            </div>
        </div>
    );
};
