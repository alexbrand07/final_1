const {PrismaClient} = require('@prisma/client');
const cron = require("node-cron");
const { product } = require('../db/prismaClient');
const prisma = new PrismaClient();

async function ExpiredProducts() {
    const ExpiProducts = await prisma.product.findMany({
      where: {
        expirationDate: {
          lte: new Date()
      }}
    })
    console.log(ExpiProducts)
    const result = await prisma.$queryRaw`CALL public.deleteexpiredproducts( '2023-02-10' )`
    console.log(result)
    console.log('Expired products deleted successfully.');
}
cron.schedule("29 9 * * *", function(){
    ExpiredProducts();
});

module.exports = ExpiredProducts
