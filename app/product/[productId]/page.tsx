import prisma from '../../../lib/prisma';
import { Product } from '@prisma/client';
import Link from 'next/link';
import ImageGallery from '../components/ImageGalley';
import IndividualProductDetails from '../components/IndividualProductDetails';

interface PageProps {
    params: {
        productId: string;
    };
}

const getData = async ({
    productId,
}: {
    productId: string;
}): Promise<Product> => {
    const product = await prisma.product.findFirst({
        where: {
            id: productId,
        },
    });
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
};

export default async function ProductRoute({
    params,
}: PageProps): Promise<JSX.Element> {
    const product = await getData({ productId: params.productId });
    return (
        <main className="ml-2">
            <div className="m-2 max-w-[1000px] container mx-auto  ">
                <div className="text-gray-400 underlines">
                    <Link href="/target">Target</Link> /{' '}
                    <Link href="/school-office-supplies">
                        School &amp; Office Supplies
                    </Link>{' '}
                    / <Link href="highlighters">Highlighters</Link>
                </div>
                <p className="text-xs text-gray-400 underline">
                    Shop All {product.brand}
                </p>
                <h1 className="text-lg font-bold mb-4">{product.title}</h1>
                <div className="grid grid-cols-1 sm:grid-rows-2 sm:grid-cols-5 gap-2">
                    <ImageGallery
                        images={product.images}
                        videos={product.videos}
                    />
                    <IndividualProductDetails
                        readyInMinutes={product.readyInMinutes}
                        price={product.price}
                        rating={product.rating}
                    />
                </div>
            </div>
        </main>
    );
}
