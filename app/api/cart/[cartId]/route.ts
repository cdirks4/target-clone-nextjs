import { Collection, Product } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
export async function POST(
    request: Request,
    {
        params,
        body,
    }: {
        params: { cartId: string };
        body: { productId: string };
    }
) {
    try {  
        const cart = await prisma.cart.findUnique({
            where: { id: params.cartId },
            include: { products: true },
        });
        const {productId} = await request.json()
        if (cart) {
            const updatedProducts = [
                ...cart.products,
                { id: productId },
            ] as Product[];
            const updatedCart = await prisma.cart.update({
                where: { id: cart.id },
                data: {
                    products: { set: updatedProducts },
                },
            });
            return NextResponse.json(updatedCart)
        }
    } catch (error) {
        
        return NextResponse.json(error)
    }
}
