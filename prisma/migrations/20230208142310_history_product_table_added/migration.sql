-- CreateTable
CREATE TABLE "HistoryProduct" (
    "id" SERIAL NOT NULL,
    "prod_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "delete_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoryProduct_pkey" PRIMARY KEY ("id")
);
