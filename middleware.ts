import { NextResponse, NextRequest } from 'next/server';
import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    publicRoutes: [
        '/',
        '/api/cart',
        '/collection/:collectionId',
        '/product/:productId',
    ],
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
