/*
  Warnings:

  - Added the required column `order` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tcin` to the `product` table without a default value. This is not possible if the table is not empty.
  - Made the column `ready_in_minutes` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `store_city` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "collectionId" UUID,
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

-- CreateIndex
CREATE INDEX "ProductOrderIndex" ON "product"("collectionId", "order");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
