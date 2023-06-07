import './globals.css';
import { Inter } from 'next/font/google';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from './context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Target Clone',
    description: 'Targets site rebuilt in Nextjs',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <Navbar></Navbar>
                    <CartProvider>
                        <SearchBar></SearchBar>
                        {children}
                    </CartProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
