/*
  Warnings:

  - The primary key for the `Logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `Logs` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logs" DROP CONSTRAINT "Logs_pkey",
DROP COLUMN "product_id",
DROP COLUMN "product_name",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "Logs_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
