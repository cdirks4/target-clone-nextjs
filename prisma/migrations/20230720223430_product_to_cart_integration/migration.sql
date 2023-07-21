/*
  Warnings:

  - You are about to drop the column `cart_id` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_cart_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "cart_id";

-- CreateTable
CREATE TABLE "product_to_cart" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_id" UUID NOT NULL,
    "cart_id" UUID NOT NULL,

    CONSTRAINT "product_to_cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_to_cart" ADD CONSTRAINT "product_to_cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_to_cart" ADD CONSTRAINT "product_to_cart_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
