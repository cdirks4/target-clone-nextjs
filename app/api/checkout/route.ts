import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '../../../lib/prisma';
import Stripe from 'stripe';
import { OrderType, Product } from '@prisma/client';

interface ProductWithQuantity extends Product {
    quantity: number;
    orderType: OrderType;
}
export async function POST(request: NextRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2023-08-16',
    });
    const { userId } = getAuth(request);
    const { cartProducts } = await request.json();
    if (!userId)
        return NextResponse.json({
            error: { message: 'User not found.', status: 404 },
        });

    const product = await prisma.product.findUnique({
        select: {
            id: true,
            title: true,
            price: true,
        },
        where: {
            id: cartProducts[0].id,
        },
    });
    if (!product) {
        return NextResponse.json({
            error: { message: 'User not found.', status: 404 },
        });
    }
    const session = await stripe.checkout.sessions.create({
        line_items: cartProducts.map((product: ProductWithQuantity) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.title,
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: product.quantity,
            };
        }),
        mode: 'payment',
        success_url: 'https://temp-omega-eight.vercel.app/',
        cancel_url: 'https://temp-omega-eight.vercel.app/cart',
    });
    return NextResponse.json({ url: session.url });
}
