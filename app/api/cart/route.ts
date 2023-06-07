import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '../../../lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        const user = await prisma.user.findUnique({
            where: {
                externalId: userId ? userId : process.env.TES_CLERK_USER,
            },
        });
        const { productId } = await request.json();
        if (user) {
            const cart = await prisma.cart.upsert({
                where: {
                    ownerId: user.id,
                },
                create: {
                    ownerId: user.id,
                    products: { connect: { id: productId } },
                },
                update: {
                    products: {
                        connect: { id: productId },
                    },
                },
            });
            return NextResponse.json(cart);
        }
    } catch (error) {
        return NextResponse.json(error);
    }
}

export async function GET(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        if (userId) {
            const user = await prisma.user.findFirstOrThrow({
                where: {
                    externalId: userId,
                },
            });
            const cart = await prisma.cart.findUnique({
                where: { ownerId: user.id },
                include: { products: true },
            });
            return NextResponse.json(cart);
        }
    } catch (error) {
        return NextResponse.json(error);
    }
}
