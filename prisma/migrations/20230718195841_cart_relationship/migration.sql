/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[owner_id]` on the table `cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "owner_id" UUID NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "externalId" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_externalId_key" ON "user"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_owner_id_key" ON "cart"("owner_id");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
