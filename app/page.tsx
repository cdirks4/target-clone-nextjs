import { PrismaClient, Product } from '@prisma/client';
import Link from 'next/link';
import ImageGallery from './components/ImageGalley';
const getData = async (): Promise<Product> => {
    const prisma = new PrismaClient();
    const product = await prisma.product.findFirst();

    return product;
};

export default async function ProductPage() {
    const product = await getData();

    return (
        <main>
            <div className=" ">
                <div className="text-xs">
                    <Link href="/target">Target</Link> /{' '}
                    <Link href="/school-office-supplies">
                        School &amp; Office Supplies
                    </Link>{' '}
                    / <Link href="highlighters">Highlighters</Link>
                </div>
                <p className="text-xs">Shop All {product.brand}</p>
                <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
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
