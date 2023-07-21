-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('PICKUP', 'DELIVERY', 'SHIPPING');

-- AlterTable
ALTER TABLE "product_to_cart" ADD COLUMN     "orderType" "OrderType" NOT NULL DEFAULT 'PICKUP';
