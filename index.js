
const app = require("./app");


app.listen(3000,() => {
  console.log("Server is listening on 3000");
})

// cron.schedule("14 11 * * *", () => {
//   const currentDate = new Date();
//   const expiredProducts = prisma.product.findMany({
//     where: {
//       expirationDate: {
//         lte: currentDate
//       }
//     }
//   });
//   console.log(`Found ${expiredProducts.length} expired products`);
// });



// cron.schedule("52 10 * * *", async () => {
//   console.log("running")
//   const currentDate = new Date();
//   const expiredProducts = await prisma.product.findMany({
//     where: {
//       expirationDate: {
//         lte: currentDate
//       }
//     }
//   });
//   await Promise.all(expiredProducts.map(async (product) => {
//     await prisma.expired_product.create({
//       data: {
//         name: product.name,
//         expirationDate: product.expirationDate
//       }
//     });
//     await prisma.product.delete({
//       where: {
//         id: product.id
//       }
//     });
//   }));
// });






// prisma.$queryRaw('SELECT * FROM products WHERE expirationDate < CURDATE()', function(error, results) {
//   if (error) throw error;

//   const expiredProducts = results;
//   expiredProducts.forEach(function(product) {
//     connection.$queryRaw(`INSERT INTO expired_products (name, expiration_date) VALUES ('${product.name}', '${product.expiration_date}')`, function(error, results) {
//       if (error) throw error;
//     });
//     connection.$queryRaw(`DELETE FROM products WHERE id = ${product.id}`, function(error, results) {
//       if (error) throw error;
//     });
//   });
// });
// }