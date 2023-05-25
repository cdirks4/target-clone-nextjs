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
        <div className="grid justify-center">
            <h1 className="text-center m-10 text-2xl font-bold">
                Featured Categories
            </h1>
            <div className="w-full flex gap-6">
                {collections.map((collection, index) => {
                    return (
                        <div key={`collecion-div-${index}`} className=" flex ">
                            <div>
                                <Link href={`/collection/${collection.id}`}>
                                    <Image
                                        className="rounded-full"
                                        key={`collecion-cover-art-${index}`}
                                        src={collection.coverImage}
                                        alt={`Image ${index + 1}`}
                                        width={140}
                                        height={140}
                                    />
                                </Link>
                                <p className="text-center text-xs">
                                    {collection.name}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
