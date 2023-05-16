/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import { ShoppingCartIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const SearchBar = () => {
return (
    <div className='bg-white w-full h-16 flex items-center justify-around'>
        <a title="Target Corporation, Public domain, via Wikimedia Commons" href="/" className="w-10 h-10 flex items-center        justify-center hover:border-2  hover:border-dotted hover:border-gray-500 "
        >
            <img
                width="32"
                height="32"
                alt="Target Corporation logo (vector)"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/32px-Target_Corporation_logo_%28vector%29.svg.png"
                className="object-contain"/>
        </a>
        <div className="space-y-0.5">
        <div className="w-3 h-0.5 bg-gray-400"></div>
        <div className="w-3 h-0.5 bg-gray-400"></div>
        <div className="w-3 h-0.5 bg-gray-400"></div>
    </div>
        <div className='h-9 bg-gray-100 rounded-lg flex items-center'>
            <input type='text' className='min-w-[300px] text-xs placeholder-gray-500 rounded-lg h-9 bg-gray-100 border-transparent !outline-none' placeholder='What can we help you find?'></input>
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
        </div>
        <div>
        <button className="text-gray-600 text-xs inline-flex items-center    rounded-lg focus:shadow-outline hover:bg-gray-200 h-10 w-18">
        <UserCircleIcon className=" h-6 w-6 text-gray-600  "/>
        <span>
            
            Sign In
            </span>
        </button>
        </div>
        <ShoppingCartIcon className="h-6 w-6 text-gray-500  " />
    </div>
    );
};

export default SearchBar;