/*
  Warnings:

  - Added the required column `order` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tcin` to the `product` table without a default value. This is not possible if the table is not empty.
  - Made the column `ready_in_minutes` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `store_city` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "cart_id" UUID,
ADD COLUMN     "collection_id" UUID,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "tcin" TEXT NOT NULL,
ALTER COLUMN "ready_in_minutes" SET NOT NULL,
ALTER COLUMN "store_city" SET NOT NULL;

-- CreateTable
CREATE TABLE "collection" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" UUID NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
