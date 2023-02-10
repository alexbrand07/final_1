-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopsProduct" (
    "productId" INTEGER NOT NULL,
    "shopId" INTEGER NOT NULL,

    CONSTRAINT "ShopsProduct_pkey" PRIMARY KEY ("productId","shopId")
);

-- AddForeignKey
ALTER TABLE "ShopsProduct" ADD CONSTRAINT "ShopsProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopsProduct" ADD CONSTRAINT "ShopsProduct_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
