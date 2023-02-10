/*
  Warnings:

  - You are about to drop the column `productId` on the `logs` table. All the data in the column will be lost.
  - Added the required column `product_Id` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_productId_fkey";

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "productId",
ADD COLUMN     "product_Id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_product_Id_fkey" FOREIGN KEY ("product_Id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
