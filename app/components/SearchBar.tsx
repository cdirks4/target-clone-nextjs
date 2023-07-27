/* eslint-disable @next/next/no-img-element */
'use client';
import React, { FC, useContext } from 'react';
import { UserButton } from '@clerk/nextjs';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { CartContext } from '../context/CartContext';
import Link from 'next/link';
import { useUser } from '@clerk/clerk-react';

const SearchBar: FC = () => {
    const { cartProducts } = useContext(CartContext);
    const { isSignedIn } = useUser();
    return (
        <div className="relative bg-white w-full h-16 flex items-center justify-around shadow-lg ">
            <Link
                href="/"
                className="w-10 h-10 flex items-center justify-center hover:border hover:border-dashed hover:border-gray-500 hover:cursor-pointer hover:rounded-full"
            >
                <img
                    width="32"
                    height="32"
                    alt="Target Corporation logo (vector)"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/32px-Target_Corporation_logo_%28vector%29.svg.png"
                    className="object-contain cursor-pointer"
                />
            </Link>
            <div
                id="hamburger-display-button"
                className="h-9 bg-gray-100 rounded-lg flex items-center"
            ></div>
            <div>
                {!isSignedIn ? (
                    <Link href="/sign-up" className="flex  text-center">
                        <UserCircleIcon className="h-6 w-6 text-gray-500" />
                        <p className="text-gray-500 text-xs  ml-[3px] mt-[3px]">
                            Sign Up
                        </p>
                    </Link>
                ) : (
                    <UserButton afterSignOutUrl="/" />
                )}
            </div>{' '}
            <div className="relative">
                <Link href="/cart">
                    <ShoppingCartIcon className="h-6 w-6 text-gray-500" />
                </Link>
                {cartProducts?.length > 0 && (
                    <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                        <div className="flex items-center justify-center w-4 h-4 bg-red-600 rounded-full text-white">
                            <p className="text-[8px]">{cartProducts.length}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
