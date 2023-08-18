import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '../../../lib/prisma';
import { ProductToCart, Product } from '@prisma/client';
interface ProductToCartWithProduct extends ProductToCart {
    product: Product;
}

export async function GET(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({
                error: { message: 'User not authenticated.', status: 401 },
            });
        }

        const user = await prisma.user.upsert({
            where: {
                externalId: userId,
            },
            create: {
                externalId: userId,
            },
            update: {},
        });

        if (!user) {
            return NextResponse.json({
                error: { message: 'User not found.', status: 404 },
            });
        }

        const cart = await prisma.cart.findUnique({
            where: { ownerId: user.id },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                    orderBy: {
                        product: {
                            title: 'asc',
                        },
                    },
                },
            },
        });

        if (!cart) {
            return NextResponse.json({
                error: { message: 'Cart not found.', status: 404 },
            });
        }
        const { products } = cart;
        const productsWithQuantity = products.map((productToCart) => {
            const { quantity, product, orderType } = productToCart;
            return { ...product, quantity, orderType };
        });

        return NextResponse.json(productsWithQuantity);
    } catch (error) {
        return NextResponse.json({
            error: { message: 'An error occurred.', status: 500 },
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({
                error: { message: 'User not authenticated.', status: 401 },
            });
        }
        const { productId, quantity, orderType } = await request.json();
        const user = await prisma.user.upsert({
            where: {
                externalId: userId,
            },
            create: {
                externalId: userId,
            },
            update: {},
        });
        if (!user) {
            return NextResponse.json({
                error: { message: 'User not authenticated.', status: 401 },
            });
        }
        let cart = await prisma.cart.findUnique({
            where: { ownerId: user.id },
            include: { products: true },
        });
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    ownerId: user.id,
                    products: {
                        create: {
                            quantity: 1,
                            orderType,
                            product: { connect: { id: productId } },
                        },
                    },
                },
                include: {
                    products: {
                        include: {
                            product: true,
                        },
                    },
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
                        orderType,
                        quantity: quantity,
                    },
                });
            } else {
                try {
                    await prisma.productToCart.create({
                        data: {
                            orderType,
                            quantity,
                            productId,
                            cartId: cart.id,
                        },
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }

        cart = await prisma.cart.findUnique({
            where: { ownerId: user.id },
            include: {
                products: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (cart) {
            const productsWithQuantity: ProductToCartWithProduct[] =
                cart.products.map((productToCart) => {
                    //@ts-ignore
                    const { quantity, product, orderType } = productToCart;
                    return { ...product, quantity, orderType };
                });
            return NextResponse.json(productsWithQuantity);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json('An error occurred.', { status: 500 });
    }
}
