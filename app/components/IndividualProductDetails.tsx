import React, { FC } from 'react';
import RatingStars from './RatingStars';

interface IndividualProductProps {
    price: number;
    rating: number;
    readyInMinutes: number | null;
}
const IndividualProductDetails: FC<IndividualProductProps> = ({
    price,
    rating,
    readyInMinutes,
}) => {
    return (
        <div className="col-span-2">
            <h2>${price}</h2>
            <p className="text-xs">When purchased online</p>
            <RatingStars rating={rating} />
            <div className="grid gap-2 grid-cols-3 h-32">
                <div className="border-xs rounded-lg h-full">
                    <h2 className="font-bold text-sm">Pickup</h2>
                    {readyInMinutes !== null ? (
                        <p className="text-[10px] text-gray-400">
                            {`Ready in ${readyInMinutes / 60} hours`}
                            {readyInMinutes % 60 > 0 &&
                                ` and ${readyInMinutes % 60} minutes`}
                        </p>
                    ) : (
                        <p>Unavailable</p>
                    )}
                </div>
                <div className="border-xs h-full rounded-lg ">
                    <h2 className="font-bold text-sm">Delivery</h2>
                </div>
                <div className="border-xs h-full rounded-lg">
                    <h2 className="font-bold text-sm">Shipping</h2>
                </div>
            </div>
        </div>
    );
};

export default IndividualProductDetails;
