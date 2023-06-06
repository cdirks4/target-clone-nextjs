'use client';
import React, { useState } from 'react';

type Props = {
    productId: string;
};

const BuyButton: React.FC<Props> = ({ productId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            const cartResponse = await fetch(`/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });
            const cart = await cartResponse.json();
        } catch (error) {
            console.error(
                'An error occurred while adding the product to cart:',
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleAddToCart}
                className="bg-red-700 text-white rounded text-[10px] min-h-[30px] p-1 font-bold"
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className="flex items-center">
                        <svg
                            className="animate-spin h-5 w-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zM12 20c3.042 0 5.824-1.135 7.938-3l-1.647-3A7.962 7.962 0 0112 16v4zm5.291-6h4c0-3.042-1.135-5.824-3-7.938l-3 1.647A7.962 7.962 0 0116 12zm-8-8c-3.042 0-5.824 1.135-7.938 3l1.647 3A7.962 7.962 0 0112 8V4z"
                            />
                        </svg>
                        Adding to Cart...
                    </span>
                ) : (
                    'Add to Cart'
                )}
            </button>
        </div>
    );
};

export default BuyButton;
