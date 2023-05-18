-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "ratings_total" INTEGER NOT NULL,
    "images" TEXT[],
    "videos" TEXT[],
    "description" TEXT[],
    "highlights" TEXT[],

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
