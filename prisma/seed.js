const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const data = require('./seed.json');
async function main() {
	const { product } = data;
	const productData = {
		title: product.title,
		brand: product.brand,
		rating: product.rating,
		ratingsTotal: product.ratings_total,
		images: product.images.map((image) => image.link),
		videos: product.videos.map((video) => video.link),
		description: [product.description],
		highlights: product.feature_bullets,
	}
	try {
		const createdProduct = await prisma.product.create({
			data: productData,
		});
		console.log(`Created product with id ${createdProduct.id}`)
	} catch (err) {
		console.log(err)
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log('finally');
		// await prisma.$disconnect();
	});
