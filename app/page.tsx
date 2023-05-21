import prisma from '../lib/prisma';
import { Product } from '@prisma/client';
import Link from 'next/link';
import ImageGallery from './components/ImageGalley';
const getData = async (): Promise<Product> => {
    const product = await prisma.product.findFirst();

    return product;
};

export default async function ProductPage() {
    const product = await getData();

    return (
        <main>
            <div className="m-2">
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
                <div className="grid grid-cols-5">
                    <ImageGallery
                        images={product.images}
                        videos={product.videos}
                    />
                </div>
            </div>
        </main>
    );
}
