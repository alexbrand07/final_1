-- DropForeignKey
ALTER TABLE "CategoriesOnProduct" DROP CONSTRAINT "CategoriesOnProduct_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnProduct" DROP CONSTRAINT "CategoriesOnProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "ShopsProduct" DROP CONSTRAINT "ShopsProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "ShopsProduct" DROP CONSTRAINT "ShopsProduct_shopId_fkey";

-- AddForeignKey
ALTER TABLE "CategoriesOnProduct" ADD CONSTRAINT "CategoriesOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnProduct" ADD CONSTRAINT "CategoriesOnProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopsProduct" ADD CONSTRAINT "ShopsProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopsProduct" ADD CONSTRAINT "ShopsProduct_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
