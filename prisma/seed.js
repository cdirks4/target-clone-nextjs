const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	try {
		const collectionOfProductsResponse = await fetch("https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&channel=WEB&count=24&default_purchasability_filter=true&include_sponsored=true&keyword=laptop&max_price=100000&min_price=650&offset=0&page=%2Fs%2Flaptop&platform=mobile&pricing_store_id=1266&scheduled_delivery_store_id=1266&store_ids=1266%2C3305%2C3253%2C3287%2C1290&useragent=Mozilla%2F5.0+%28Linux%3B+Android+6.0%3B+Nexus+5+Build%2FMRA58N%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F113.0.0.0+Mobile+Safari%2F537.36&visitor_id=018825EEB2C00201916F68E946774CBF&zip=01867", {
			"headers": {
				"accept": "application/json",
				"accept-language": "en-US,en;q=0.9",
				"sec-ch-ua": "\"Google Chrome\";v=\"113\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
				"sec-ch-ua-mobile": "?1",
				"sec-ch-ua-platform": "\"Android\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-site"
			},
			"referrer": "https://www.target.com/s?searchTerm=laptop&moveTo=product-list-grid&minPrice=650&maxPrice=100000",
			"referrerPolicy": "no-referrer-when-downgrade",
			"body": null,
			"method": "GET",
			"mode": "cors",
			"credentials": "include"
		});
		const collectionOfProducts = await collectionOfProductsResponse.json()
		await Promise.all(
			collectionOfProducts.data.search.products.map(
				async (prod, index) => {
					const productResponse = await fetch(
						`https://redsky.target.com/redsky_aggregations/v1/web/pdp_client_v1?key=9f36aeafbe60771e321a7cc95a78140772ab3e96&tcin=${prod.tcin}&is_bot=false&store_id=1266&pricing_store_id=1266&has_pricing_store_id=true&scheduled_delivery_store_id=1266&has_financing_options=true&visitor_id=018825EEB2C00201916F68E946774CBF&has_size_context=true&latitude=42.540&longitude=-71.110&zip=01867&state=MA&skip_personalized=true&channel=WEB&page=%2Fp%2FA-54191097`);
					const product = await productResponse.json();
					console.log(product)
					const transformedProduct = {
						collectionId: '5c08933b-eaf7-4822-a0b7-6e1c84857f13',
						tcin: product.data.product.tcin,
						order: index,
						title: product.data.product.item.product_description
							.title,
						brand: product.data.product.item.primary_brand.name,
						price: product.data.product.price.current_retail,
						rating: product.data.product.ratings_and_reviews
							.statistics.rating.average,
						ratingsTotal:
							product.data.product.ratings_and_reviews.statistics
								.rating.count,
						images: [
							product.data.product.item.enrichment.images
								.primary_image_url,
							...product.data.product.item.enrichment.images
								?.alternate_image_urls,
						],
						videos: product.data.product.item.enrichment.videos
							? product.data.product.item.enrichment.videos[0].video_files.map(
								(vid) => vid.video_url
							)
							: [],
						description:
							product.data.product.item["product_description"]
							["downstream_description"],
						highlights:
							product.data.product.item["product_description"]
							["soft_bullets"]?.bullets,
						isInStock: true,
						storeCity: 'Woburn',
						readyInMinutes: 90,
					};
					const item = await prisma.product.deleteMany({ where: { tcin: transformedProduct.tcin } });
					console.log(item)
				}
			)
		)
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
		await prisma.$disconnect();
	});
