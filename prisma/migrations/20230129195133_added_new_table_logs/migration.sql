-- CreateTable
CREATE TABLE "Logs" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "delete_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("product_id")
);
