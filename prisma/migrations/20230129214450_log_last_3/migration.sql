/*
  Warnings:

  - You are about to drop the column `product_Id` on the `logs` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_product_Id_fkey";

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "product_Id",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
