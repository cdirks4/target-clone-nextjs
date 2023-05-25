import React from 'react';

type Props = {};

const BuyButton = (props: Props) => {
    return (
        <div>
            <button className="bg-red-700 text-white rounded text-[10px] min-h-[30px] p-1 font-bold">
                Add to Cart
            </button>
        </div>
    );
};

export default BuyButton;
