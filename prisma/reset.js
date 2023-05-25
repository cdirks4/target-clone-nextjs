const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	
	try {
		const createdProduct = await prisma.product.deleteMany();
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
