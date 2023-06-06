

const { PrismaClient } = require("@prisma/client");

const sourceDB = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });
const targetDB = new PrismaClient({ datasources: { db: { url: process.env.TEST_DB_URL } } });

async function transferProducts() {
    try {
        await sourceDB.$connect();
        await targetDB.$connect();
        const products = await sourceDB.product.findMany();
        for (const product of products) {
            await targetDB.product.create({
                data: {
                    ...product
                },
            });
        }
        console.log("Products transferred successfully.");
    } catch (error) {
        console.error("Error transferring products:", error);
    } finally {
        // Disconnect from the databases
        await sourceDB.$disconnect();
        await targetDB.$disconnect();
    }
}

transferProducts();
