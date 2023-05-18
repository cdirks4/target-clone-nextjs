// MainComponent.tsx
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, FC } from 'react';
import {
    ShoppingCartIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline';
import IconButton from './IconButton';
import Sidebar from './SideBar';

const SearchBar: FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState<Boolean>(false);

    return (
        <div className="relative bg-white w-full h-16 flex items-center justify-around">
            <a
                title="Target Corporation, Public domain, via Wikimedia Commons"
                href="/"
                className="w-10 h-10 flex items-center justify-center hover:border-2  hover:border-dotted hover:border-gray-500 "
            >
                <img
                    width="32"
                    height="32"
                    alt="Target Corporation logo (vector)"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Target_Corporation_logo_%28vector%29.svg/32px-Target_Corporation_logo_%28vector%29.svg.png"
                    className="object-contain"
                />
            </a>
            <IconButton
                Icon={Bars3Icon}
                onClick={() => setSidebarOpen(true)}
            ></IconButton>
            <div
                id="hamburger-display-button"
                className="h-9 bg-gray-100 rounded-lg flex items-center"
            >
                <input
                    type="text"
                    className="min-w-[300px] text-xs placeholder-gray-500 rounded-lg h-9 bg-gray-100 border-transparent !outline-none"
                    placeholder="What can we help you find?"
                ></input>
                <IconButton
                    Icon={MagnifyingGlassIcon}
                    onClick={() => console.log('ToDo')}
                />
            </div>
            <div>
                <IconButton
                    Icon={UserCircleIcon}
                    onClick={() => console.log('ToDo')}
                ></IconButton>
            </div>
            <ShoppingCartIcon className="h-6 w-6 text-gray-500  " />
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
        </div>
    );
};

export default SearchBar;
