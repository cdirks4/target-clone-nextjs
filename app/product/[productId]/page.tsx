import prisma from '../../../lib/prisma';
import { Product } from '@prisma/client';
import Link from 'next/link';
import ImageGallery from '../components/ImageGalley';
import ProductBuyBox from '../components/ProductBuyBox';
import AboutProduct from '../components/AboutProduct';
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
                <div className="text-gray-500 text-[10px]  ">
                    <Link href="/target" className="underline">
                        {' '}
                        Target
                    </Link>{' '}
                    {' / '}
                    <Link href="/school-office-supplies" className="underline">
                        Apple
                    </Link>
                </div>

                <h1 className="text-lg font-bold mb-4">{product.title}</h1>
                <div className="grid grid-cols-1 sm:grid-rows-2 sm:grid-cols-5 gap-2 h-full">
                    <ImageGallery
                        images={product.images}
                        videos={product.videos}
                    />
                    <ProductBuyBox
                        readyInMinutes={product.readyInMinutes}
                        price={product.price}
                        rating={product.rating}
                        productId={product.id}
                    />
                    <AboutProduct
                        highlights={product.highlights}
                        description={product.description}
                    />
                </div>
            </div>
        </main>
    );
}
