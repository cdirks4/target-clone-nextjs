'use client';
import React, { ButtonHTMLAttributes, FC } from 'react';
import { ExclamationIcon, IconType } from '@heroicons/react/outline';
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    Icon?: IconType;
}

const IconButton: FC<IconButtonProps> = ({
    Icon = ExclamationIcon,
    onClick,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center w-8 h-8 bg-white rounded-md hover:bg-gray-100  focus:outline-none focus:border-gray-500 focus:border-dashed focus:border-xs   "
            {...props}
        >
            <Icon className="w-6 h-6 text-gray-500" aria-hidden="true" />
        </button>
    );
};

export default IconButton;
