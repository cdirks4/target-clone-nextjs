'use client';
import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { OrderType } from '@prisma/client';

interface AddToCartButtonProps {
    productId: string;
    quantity: number | null;
    textSize: string;
    orderType: OrderType;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    productId,
    quantity,
    orderType,
    textSize = '10',
}) => {
    const { addProductToCart } = useContext(CartContext);
    const { cartProducts } = useContext(CartContext);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Add state to hold the error message

    const handleAddToCart = async () => {
        let updatedQuantity;

        if (quantity === null) {
            const existingProduct = cartProducts.find(
                (product) => product.id === productId
            );
            updatedQuantity = existingProduct
                ? existingProduct.quantity + 1
                : 1;
        } else {
            updatedQuantity = quantity;
        }

        setIsAddingToCart(true);
        const check = await addProductToCart(
            productId,
            updatedQuantity,
            orderType
        );

        if (check) {
            setErrorMessage(check);
        }

        setIsAddingToCart(false);
    };

    return (
        <div>
            <button
                onClick={handleAddToCart}
                className={`bg-red-700 text-white rounded text-[${textSize}px] min-h-[30px] p-1 font-bold w-full h-full `}
                disabled={isAddingToCart}
            >
                <Spinner
                    isLoading={isAddingToCart}
                    loadingText="Adding to Cart..."
                    buttonText="Add to Cart"
                />
            </button>
            {errorMessage && ( // Display the error message if it exists
                <p className="text-red-700 text-[8px]">{errorMessage}</p>
            )}
        </div>
    );
};
export { AddToCartButton };

type SpinnerProps = {
    isLoading: boolean;
    loadingText?: string;
    buttonText?: string;
};

const Spinner: React.FC<SpinnerProps> = ({
    isLoading,
    loadingText = 'Adding to Cart...',
    buttonText = 'Add to Cart',
}) => {
    if (isLoading) {
        return (
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
                {loadingText}
            </span>
        );
    }

    return <>{buttonText}</>;
};
