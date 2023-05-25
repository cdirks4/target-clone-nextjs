'use client';
import React, { ButtonHTMLAttributes, FC } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    Icon?: FC<Parameters<typeof MagnifyingGlassIcon>[0]>;
}

const IconButton: FC<IconButtonProps> = ({
    Icon = MagnifyingGlassIcon,
    onClick,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center w-8 h-8 bg-white rounded-md hover:bg-gray-100  focus:outline-none focus:border-gray-500 focus:border-dashed focus:border   "
            {...props}
        >
            <Icon className="w-6 h-6 text-gray-500" aria-hidden="true" />
        </button>
    );
};

export default IconButton;
