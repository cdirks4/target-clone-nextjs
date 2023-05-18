// Sidebar.tsx
import React, { FC } from 'react';

interface SidebarProps {
    isSidebarOpen: Boolean;
    setSidebarOpen: (open: Boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
    return (
        <div
            className={`fixed left-0 top-0 h-full transition-all duration-500 ease-in-out transform ${
                isSidebarOpen
                    ? 'translate-x-0 w-1/3 bg-gray-200'
                    : 'translate-x-full w-0 opacity-0'
            }`}
        >
            <div className="flex justify-between">
                <h2>Menu</h2>
                <button onClick={() => setSidebarOpen(false)}>Close</button>
            </div>
            <div>
                <h3>Categories</h3>
                <div>
                    <div className="bg-white h-10 w-10 rounded-full"></div>
                    <p className="text-xs">Home</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
