// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient()


// async function addProduct() {
//     const newProduct = {
//             name: "Adidas",
//             description: "Nice and light",
//             categories: [1,3,4],
//             shop: {shopId:1},
//             expirationDate: new Date(new Date().getTime() + 2* 60000),
//         }
//     await prisma.product.create({
//         data:newProduct
//     });

//     console.log(`product has been added: ${newProduct.name}`);
// }

// setInterval(addProduct, 1000 * 60);




// const addProduct = async () => {
//   const client = new Client({
//     user: 'alexeykhorishko',
//     host: 'localhost',
//     database: 'alexeykhorishko',
//     password: 'Vivi201219',
//     port: 5432
//   });
  
//   await client.connect();

//   const query = 'INSERT INTO products(name, description, shopId) VALUES($1, $2)';
//   const values = ['Product 1', "nice and light", 1];

//   await client.query(query, values);
  
//   console.log('New product added to the database.');

//   await client.end();
// };

// setInterval(addProduct, 3600000);







// const axios = require("axios")

// const addProduct = async () => {
//     try {
//         const product = {
//             name : "Adidas",
//             description: "Nice and light",
//             shopId : 1
//         };

//         const response = await axios.post("http//localhost:3000/product", product);
//         console.log(`Product added successfully: ${response.data.id}`);

//     } catch (error) {
//         console.error(`Error adding product: ${error.message}`);
//     } 
// };
// setInterval(addProduct, 3600000);


// module.exports = addProduct