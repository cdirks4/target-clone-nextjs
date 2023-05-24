import prisma from '../lib/prisma';
import { Product } from '@prisma/client';

const getData = async (): Promise<Product> => {
    const product = await prisma.product.findFirst();
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

export default async function ProductRoute() {
    const product = await getData();
    return <></>;
}
