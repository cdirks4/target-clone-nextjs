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
                    <Link href="/" className="underline">
                        {' '}
                        Home
                    </Link>{' '}
                    {' / '}
                    <Link href="/" className="underline">
                        {product.brand}
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-rows-2 sm:grid-cols-5 gap-2 h-full">
                    <ImageGallery
                        images={product.images}
                        videos={product.videos}
                    />
                    <ProductBuyBox
                        title={product.title}
                        price={product.price}
                        rating={product.rating}
                        productId={product.id}
                        readyInMinutes={product.readyInMinutes}
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
