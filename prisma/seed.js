const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const collectionOfAppleProducts = require('./secondSeed.json');
async function main() {

	try {

		await Promise.all(
			collectionOfAppleProducts.data.search.products.map(
				async (prod, index) => {
					const appleProductResponse = await fetch(
						`https://redsky.target.com/redsky_aggregations/v1/web/pdp_client_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&tcin=${prod.tcin}&is_bot=false&store_id=1266&pricing_store_id=1266&has_pricing_store_id=true&scheduled_delivery_store_id=1266&has_financing_options=true&visitor_id=018825EEB2C00201916F68E946774CBF&has_size_context=true&latitude=42.540&longitude=-71.110&zip=01867&state=MA&skip_personalized=true&channel=WEB&page=%2Fp%2FA-54191097`);
					const appleProduct = await appleProductResponse.json();
					const transformedProduct = {
						collectionId: '2d7b2587-1eab-4a13-88e9-e9a9937c1d89',
						tcin: appleProduct.data.product.tcin,
						order: index,
						title: appleProduct.data.product.item.product_description
							.title,
						brand: appleProduct.data.product.item.primary_brand.name,
						price: appleProduct.data.product.price.current_retail,
						rating: appleProduct.data.product.ratings_and_reviews
							.statistics.rating.average,
						ratingsTotal:
							appleProduct.data.product.ratings_and_reviews.statistics
								.rating.count,
						images: [
							appleProduct.data.product.item.enrichment.images
								.primary_image_url,
							...appleProduct.data.product.item.enrichment.images
								?.alternate_image_urls,
						],
						videos: appleProduct.data.product.item.enrichment.videos
							? appleProduct.data.product.item.enrichment.videos[0].video_files.map(
								(vid) => vid.video_url
							)
							: [],
						description:
							appleProduct.data.product.item["product_description"]
							["downstream_description"],
						highlights:
							appleProduct.data.product.item["product_description"]
							["soft_bullets"]?.bullets,
						isInStock: true,
						storeCity: 'Woburn',
						readyInMinutes: 90,
					};
					const item = await prisma.product.create({ data: transformedProduct });
					console.log(item)
				}
			)
		)
	} catch (err) {
		console.log(err);
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		console.log('finally');
		await prisma.$disconnect();
	});
