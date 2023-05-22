/*
  Warnings:

  - Added the required column `is_in_stock` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ready_in_minutes` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "is_in_stock" BOOLEAN NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "ready_in_minutes" INTEGER NOT NULL,
ADD COLUMN     "store_city" TEXT;
