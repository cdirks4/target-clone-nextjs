import React, { FC } from 'react';
import RatingStars from '../../components/RatingStars';
import { AddToCartButton } from '../../context/CartActions';
interface IndividualProductProps {
    price: number;
    rating: number;
    readyInMinutes: number | null;
}
const IndividualProductDetails: FC<IndividualProductProps> = ({
    price,
    rating,
    readyInMinutes,
    productId,
}) => {
    return (
        <div className="col-span-2">
            <h2>${price}</h2>
            <p className="text-xs mb-1">When purchased online</p>
            <RatingStars rating={rating} />
            <div className="grid gap-2 grid-cols-3 h-full mt-2">
                <div className="border rounded-lg h-28">
                    <h2 className="font-bold text-sm  m-2">Pickup</h2>
                    {readyInMinutes !== null ? (
                        <p className="text-[10px] text-gray-400  ml-2">
                            {`Ready in ${readyInMinutes / 60} hours`}
                            {readyInMinutes % 60 > 0 &&
                                ` and ${readyInMinutes % 60} minutes`}
                        </p>
                    ) : (
                        <p>Unavailable</p>
                    )}
                </div>
                <div className="border h-28 rounded-lg ">
                    <h2 className="font-bold text-sm m-2">Delivery</h2>
                </div>
                <div className="border h-28 rounded-lg">
                    <h2 className="font-bold text-sm  m-2">Shipping</h2>
                </div>
                <div className="w-full h-28 col-span-2 col-start-2">
                    <AddToCartButton
                        textSize="10"
                        productId={productId}
                    ></AddToCartButton>
                </div>
            </div>
        </div>
    );
};

export default IndividualProductDetails;
