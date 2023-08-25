import React from 'react';

import prisma from '../../../lib/prisma';
import { Collection, Product, OrderType } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import RatingStars from '../../components/RatingStars';
import { AddToCartButton } from '../../context/CartActions';
interface PageProps {
    params: {
        collectionId: string;
    };
}

const getCollection = async ({
    collectionId,
}: {
    collectionId: string;
}): Promise<Collection & { products: Product[] }> => {
    const collection = await prisma.collection.findFirst({
        where: {
            id: collectionId,
        },
        include: { products: true },
    });
    if (!collection) {
        throw new Error('Product not found');
    }
    return collection;
};

const CollectionGrid = async ({ params }: PageProps): Promise<JSX.Element> => {
    const { collectionId } = params;
    const ProductCard = (product: Product) => (
        <div
            key={`product-card-${product.tcin}`}
            className=" bg-white  grid rows-2 "
        >
            <Link href={`/product/${product.id}`}>
                <div className="flex justify-center">
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        height={150}
                        width={150}
                    />
                </div>
            </Link>
            <div className="m-4 place-self-end">
                <Link href={`/product/${product.id}`}>
                    <h3 className="max-w-[200px] text-xs text-wrap bg-white break-words font-bold ">
                        {product.title}
                    </h3>

                    <p className="text-[9px]">{product.brand}</p>
                    <RatingStars rating={product.rating} />
                    <p className="text-xs">${product.price}</p>
                    <p className="text-[9px] mb-4">When purchased online</p>
                </Link>
                <div className="sm:w-[80px] w-14 ">
                    <AddToCartButton
                        orderType={OrderType.PICKUP}
                        quantity={null}
                        textSize="8"
                        productId={product.id}
                    ></AddToCartButton>
                </div>
            </div>
        </div>
    );

    const collection = await getCollection({ collectionId });

    return (
        <div className="mx-auto max-w-[1000px]">
            <div className="mx-auto grid gap-[1px] bg-gray-200 sm:grid-cols-3 md:grid-cols-4 grid-cols-3">
                {collection.products.map(ProductCard)}
            </div>
        </div>
    );
};

export default CollectionGrid;
