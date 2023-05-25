import { Collection } from '@prisma/client';
import prisma from '../lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
const getCollections = async (): Promise<Collection[]> => {
    const collections = await prisma.collection.findMany();
    if (!collections) {
        throw new Error('Product not found');
    }
    return collections;
};

export default async function ProductRoute() {
    const collections = await getCollections();
    return (
        <div className="w-full flex">
            {collections.map((collection, index) => {
                return (
                    <div key={`collecion-div-${index}`} className=" flex ">
                        <Link href={`/collection/${collection.id}`}>
                            <Image
                                key={`collecion-cover-art-${index}`}
                                src={collection.coverImage}
                                alt={`Image ${index + 1}`}
                                width={140}
                                height={140}
                            />
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
