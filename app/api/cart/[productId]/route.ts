import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '../../../../lib/prisma';
import { ProductToCart, Product } from '@prisma/client';
interface ProductToCartWithProduct extends ProductToCart {
    product: Product;
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { productId: string } }
) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({
                error: { message: 'NO user', status: 404 },
            });
        }
        const { productId } = params;
        const user = await prisma.user.findFirstOrThrow({
            where: { externalId: userId },
        });
        const userCart = await prisma.cart.findFirstOrThrow({
            where: { ownerId: user.id },
            include: { products: true },
        });
        const productToDeleteIndex = userCart.products.findIndex(
            (product) => product.productId === productId
        );

        if (productToDeleteIndex !== -1) {
            const productToDeleteId =
                userCart.products[productToDeleteIndex].id;

            // Delete the product from the ProductToCart table
            await prisma.productToCart.delete({
                where: { id: productToDeleteId },
            });
            const cart = await prisma.cart.findFirstOrThrow({
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
                //@ts-ignore
                const productsWithQuantity: ProductToCartWithProduct[] =
                    cart.products.map((productToCart) => {
                        const { quantity, product, orderType } = productToCart;
                        return { ...product, quantity, orderType };
                    });
                return NextResponse.json(productsWithQuantity);
            }
        } else {
            return NextResponse.json({
                error: { message: 'Product not found in cart', status: 404 },
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: { message: 'An error occured', status: 500 },
        });
    }
}
