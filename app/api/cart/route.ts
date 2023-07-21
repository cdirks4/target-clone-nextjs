import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '../../../lib/prisma';
import { Cart, ProductToCart, Product } from '@prisma/client';

export async function POST(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            console.log('returning early');
            return NextResponse.json('User not authenticated.', {
                status: 401,
            });
        }

        const { productId } = await request.json();

        const user = await prisma.user.findUnique({
            where: {
                externalId: userId,
            },
        });

        if (!user) {
            return NextResponse.json('User not found.', { status: 404 });
        }

        let cart = await prisma.cart.findUnique({
            where: { ownerId: user.id },
            include: { products: true },
        });
        console.log(cart);
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    ownerId: user.id,
                    products: {
                        create: {
                            quantity: 1, // You can set the initial quantity here
                            product: { connect: { id: productId } },
                        },
                    },
                },
                include: {
                    products: true,
                },
            });
        } else {
            const productToCart = cart.products.find(
                (product: ProductToCart) => product.productId === productId
            );
            if (productToCart) {
                await prisma.productToCart.update({
                    where: {
                        id: productToCart.id,
                    },
                    data: {
                        quantity: productToCart.quantity + 1,
                    },
                });
            } else {
                await prisma.productToCart.create({
                    data: {
                        quantity: 1,
                        productId: productId,
                        cartId: cart.id,
                    },
                });
            }
        }

        cart = await prisma.cart.findUnique({
            where: { ownerId: user.id },
            include: { products: true },
        });

        return NextResponse.json(cart);
    } catch (error) {
        console.log(error);
        return NextResponse.json('An error occurred.', { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json('User not authenticated.', {
                status: 401,
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                externalId: userId,
            },
        });

        if (!user) {
            return NextResponse.json('User not found.', { status: 404 });
        }

        const cart = await prisma.cart.findUnique({
            where: { ownerId: user.id },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) {
            return NextResponse.json('Cart not found.', { status: 404 });
        }

        // Destructure the cart to get the products
        const { products } = cart;
        // Modify the products array to add the quantity as a property of the product
        const productsWithQuantity = products.map((productToCart) => {
            const { quantity, product } = productToCart;
            return { ...product, quantity };
        });
        console.log(productsWithQuantity);
        return NextResponse.json(productsWithQuantity);
    } catch (error) {
        console.log(error);
        return NextResponse.json('An error occurred.', { status: 500 });
    }
}
