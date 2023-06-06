import React, { FC } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';
const SearchBar: FC = () => {
    return (
        <div className="relative bg-white w-full h-16 flex items-center justify-around shadow-lg ">
            <Link
                href="/"
                className="w-10 h-10 flex items-center justify-center hover:border hover:border-dashed hover:border-gray-500 hover:cursor-pointer"
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
            <div></div>
            <ShoppingCartIcon className="h-6 w-6 text-gray-500  " />
        </div>
    );
};

export default SearchBar;
