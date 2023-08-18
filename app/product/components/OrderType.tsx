'use client';
import React, { FC, useState } from 'react';
import Image from 'next/image';
type OrderTypeProps = {
    readyInMinutes: number | null;
};

const OrderTypeComponent: FC<OrderTypeProps> = ({ readyInMinutes }) => {
    const [selectedOrderType, setSelectedOrderType] = useState<
        'Pickup' | 'Delivery' | 'Shipping'
    >('Pickup');

    const handleOrderTypeChange = (
        orderType: 'Pickup' | 'Delivery' | 'Shipping'
    ) => {
        setSelectedOrderType(orderType);
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>,
        orderType: 'Pickup' | 'Delivery' | 'Shipping'
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
                    selectedOrderType === 'Pickup'
                        ? 'border-green-500 border-2'
                        : 'border-black'
                }`}
                onClick={() => handleOrderTypeChange('Pickup')}
                onKeyDown={(event) => handleKeyDown(event, 'Pickup')}
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
                        {`Ready in ${Math.floor(readyInMinutes / 60)} hours`}
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
                    selectedOrderType === 'Delivery'
                        ? 'border-green-500 border-2'
                        : 'border-black'
                }`}
                onClick={() => handleOrderTypeChange('Delivery')}
                onKeyDown={(event) => handleKeyDown(event, 'Delivery')}
            >
                <Image
                    className=""
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
                    selectedOrderType === 'Shipping'
                        ? 'border-green-500 border-2'
                        : 'border-black'
                }`}
                onClick={() => handleOrderTypeChange('Shipping')}
                onKeyDown={(event) => handleKeyDown(event, 'Shipping')}
            >
                <Image
                    className=""
                    src={
                        'https://corporate.target.com/_media/TargetCorp/news/2015/FreeShipping-Header-copy.jpg?width=940&height=470&ext=.jpg'
                    }
                    width={35}
                    height={35}
                    alt={`Target Pickup Image`}
                />

                <h2 className="font-bold text-sm">Shipping</h2>
                <p className="text-[10px] text-gray-600">
                    Get it {getTwoDaysFromDate()}
                </p>
            </div>
            <div className="cols-span-3"></div>
        </>
    );
};

export default OrderTypeComponent;
