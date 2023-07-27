'use client';
import React, { FC, useState } from 'react';
import Image from 'next/image';
import RatingStars from '../../components/RatingStars';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { AddToCartButton } from '../../context/CartActions';
import { OrderType } from '@prisma/client';

interface IndividualProductProps {
    title: string;
    price: number;
    rating: number;
    readyInMinutes: number;
    productId: string;
    quantity: number;
}
const IndividualProductDetails: FC<IndividualProductProps> = ({
    title,
    price,
    rating,
    readyInMinutes,
    productId,
    quantity,
}) => {
    const [selectedOrderType, setSelectedOrderType] = useState<OrderType>(
        OrderType.PICKUP
    );
    return (
        <div className="col-span-2">
            <h1 className="text-md font-bold mb-1">{title}</h1>
            <RatingStars rating={rating} />
            <h2 className="font-bold mt-1 mb-1">${price}</h2>
            <div className="flex">
                <p className="text-xs mb-1 mr-1">When purchased online</p>
                <InformationCircleIcon className="h-4"></InformationCircleIcon>
            </div>
            <div className="grid gap-2 grid-cols-3  mt-2">
                <OrderTypeComponent
                    {...{
                        readyInMinutes,
                        setSelectedOrderType,
                        selectedOrderType,
                    }}
                ></OrderTypeComponent>

                <select
                    className="border-gray-500 text-gray-600 rounded-sm border cursor-pointer text-[10px] p-1 h-8"
                    value={`Qty }`}
                    onChange={() => {}}
                >
                    {Array.from(Array(10).keys()).map((value) => (
                        <option key={`Qty ${value}`} value={`Qty ${value + 1}`}>
                            Qty {value + 1}
                        </option>
                    ))}
                </select>
                <div className="w-full h-28 col-span-2 col-start-2">
                    <AddToCartButton
                        orderType={selectedOrderType}
                        quantity={quantity}
                        textSize="10"
                        productId={productId}
                    ></AddToCartButton>
                </div>
            </div>
        </div>
    );
};

type OrderTypeProps = {
    readyInMinutes: number;
    setSelectedOrderType: React.Dispatch<React.SetStateAction<OrderType>>;
    selectedOrderType: OrderType;
};

const OrderTypeComponent: FC<OrderTypeProps> = ({
    readyInMinutes,
    setSelectedOrderType,
    selectedOrderType,
}) => {
    const handleOrderTypeChange = (orderType: OrderType) => {
        setSelectedOrderType(orderType);
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>,
        orderType: OrderType
    ) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleOrderTypeChange(orderType);
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
        <>
            <div
                tabIndex={0}
                className={`border rounded-lg h-28 p-2 cursor-pointer ${
                    selectedOrderType === OrderType.PICKUP
                        ? 'border-green-500 border-2'
                        : 'border-black'
                }`}
                onClick={() => handleOrderTypeChange(OrderType.PICKUP)}
                onKeyDown={(event) => handleKeyDown(event, OrderType.PICKUP)}
            >
                <Image
                    className=""
                    src={
                        'https://target.scene7.com/is/image/Target/GUEST_afff1972-2eb2-4633-814c-ddd5fa866308'
                    }
                    width={20}
                    height={20}
                    alt={`Target Pickup Image`}
                />

                <h2 className="font-bold text-sm">Pickup</h2>
                {readyInMinutes !== null ? (
                    <p className="text-[10px] text-gray-600">
                        {`Ready within ${Math.floor(
                            readyInMinutes / 60
                        )} hours`}
                        {readyInMinutes % 60 > 0 &&
                            ` and ${readyInMinutes % 60} minutes`}
                    </p>
                ) : (
                    <p>Unavailable</p>
                )}
            </div>

            <div
                tabIndex={0}
                className={`border rounded-lg h-28 p-2 cursor-pointer ${
                    selectedOrderType === OrderType.DELIVERY
                        ? 'border-green-500 border-2'
                        : 'border-black'
                }`}
                onClick={() => handleOrderTypeChange(OrderType.DELIVERY)}
                onKeyDown={(event) => handleKeyDown(event, OrderType.DELIVERY)}
            >
                <Image
                    src={
                        'https://target.scene7.com/is/image/Target/GUEST_60573d49-ca4b-4442-8a54-2a228fe24a16'
                    }
                    width={20}
                    height={20}
                    alt={`Target Pickup Image`}
                />

                <h2 className="font-bold text-sm">Delivery</h2>
                <p className="text-[10px] text-gray-600">
                    Select delivery window at checkout
                </p>
            </div>

            <div
                tabIndex={0}
                className={`border rounded-lg h-28 p-2 cursor-pointer ${
                    selectedOrderType === OrderType.SHIPPING
                        ? 'border-green-500 border-2'
                        : 'border-black'
                }`}
                onClick={() => handleOrderTypeChange(OrderType.SHIPPING)}
                onKeyDown={(event) => handleKeyDown(event, OrderType.SHIPPING)}
            >
                <Image
                    src={
                        'https://corporate.target.com/_media/TargetCorp/news/2015/FreeShipping-Header-copy.jpg?width=940&height=470&ext=.jpg'
                    }
                    width={35}
                    height={35}
                    className="w-auto h-auto"
                    alt={`Target Pickup Image`}
                />

                <h2 className="font-bold text-sm">Shipping</h2>
                <p className="text-[10px] text-gray-600">
                    Get it by Tue, Jul 27
                </p>
            </div>

            {selectedOrderType === OrderType.PICKUP && (
                <div className="col-span-3">
                    <h3 className="font-bold text-sm">Pick up at Woburn</h3>
                    <p className="text-green-800 text-xs">
                        {' '}
                        {`Ready within ${Math.floor(
                            readyInMinutes / 60
                        )} hours`}
                        {readyInMinutes % 60 > 0 &&
                            ` and ${readyInMinutes % 60} minutes `}
                        <span className="text-black">for pickup in store</span>
                    </p>
                </div>
            )}

            {selectedOrderType === OrderType.DELIVERY && (
                <div className="col-span-3">
                    <p className="font-bold text-sm">Same Day Delivery</p>
                    <p className="text-xs">
                        to <span className="font-bold text-sm">02180 </span>
                        from{' '}
                        <span className="font-bold text-sm">
                            Stoneham Redstone
                        </span>
                    </p>

                    <p className="text-xs text-green-700">
                        Get it as soon as 6pm today{' '}
                        <span className="text-black">with Shipt</span>
                    </p>
                    <p className="text-xs text-gray-500">
                        Free with membership or $9.99/delivery
                    </p>
                </div>
            )}

            {selectedOrderType === OrderType.SHIPPING && (
                <div className=" col-span-3">
                    <p className="font-bold text-sm">Ship to 02180</p>
                    <p className="text-green-700 text-xs">
                        Get it by {getTwoDaysFromDate()}
                    </p>
                    <p className="text-gray-500 text-xs">
                        Free shipping with $35 orders - Exclusions Apply.
                    </p>
                </div>
            )}
        </>
    );
};

export default IndividualProductDetails;
