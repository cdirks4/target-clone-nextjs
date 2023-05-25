import React, { FC } from 'react';
import prisma from '../../../lib/prisma';
import { Collection, Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
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

const CollectionGrid = async ({ params }: PageProps) => {
    const collection = await getCollection({
        collectionId: params.collectionId,
    });

    return (
        <div className="grid grid-cols-3 gap-2 ">
            {collection.products.map((product, index) => {
                return (
                    <div
                        key={`product-card-${product.tcin} `}
                        className="border-4 border-gray-900 "
                    >
                        <Link href={`/product/${product.id}`}>
                            <Image
                                src={product.images[0]}
                                alt={product.title}
                                height={150}
                                width={150}
                            />
                        </Link>
                        <p>{product.title}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default CollectionGrid;
