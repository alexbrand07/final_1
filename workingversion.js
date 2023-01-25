// const {PrismaClient} = require("@prisma/client");
// //import { PrismaClient } from "../generated/client";
// // import { PrismaClient } from "@prisma/client";

// const express = require("express");
// const prisma = new PrismaClient();
// const app = express();
// app.use(express.json());

// // app.use("/api/shops", ShopRoute);
// // app.use("/api/products", ProductRoute);

// // const product_controller = require("./controller/product.js")

// app.get("/", async (req,res) =>{
//   res.status(200).json({
//     "name": "Online Shop",
//     "location": "Made in Spain, Canary Islands" 
//   })
// })

// // POST PRODUCT
// app.post("/product", async (req,res) => {
//   const { name, description, categories} = req.body;
//   const result = await prisma.product.create({
//     data: {
//       name,
//       description,
//       categories: {
//         create : categories.map(c => {return {category: {connect: { id: c } }}})
//       }
//     },
//   })
//   res.json(result)
// })

// //GET ALL PRODUCTS
// app.get("/products", async (req, res) => {
//     try { const products = await prisma.product.findMany()
//     res.json(products)
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({error: error.message });
//     }
// })

// //GET A PRODUCT BY ID
// app.get("/products/:id", async (req,res)=>{
//     const {id} = req.params
//     const product = await prisma.product.findUnique({
//         where: {
//           id: Number(id)
//         },
//         include : {
//           categories: {
//             select : {
//             categoryId: true
//           }
//         }
//       }
//     })
//     res.json(product)
// })

// //GET ALL CATEGORIES 
// app.get("/categories", async (req, res) => {
//   const categories = await prisma.category.findMany()
//   res.json(categories)
// })

// //GET category BY ID
// app.get("/categories/:id", async (req,res)=>{
//   const {id} = req.params
//   const category = await prisma.category.findUnique({
//       where: { id: Number(id) },
//   })
//   res.json(category)
// })


// // UPDATE Product BY ID
// app.put("/products/:id", async(req,res)=>{
//   const {id} = req.params;
//   const { name, address} = req.body;
//   const result = await prisma.shop.update({
//     where: { id: Number(id) },
//     data: {
//       name,
//       address,
//     },
//   })
//   res.json(result)
// })




// module.exports = app
// app.listen(3000,() => {
//   console.log("Server is listening on 3000");
// })




// // app.post("/product", async (req,res) => {
// //   const { name, description, category, shopId } = req.body
// //   const result = await prisma.product.create({
// //     data: {
// //       name,
// //       description,
// //       shopId,
// //       category,
// //     },
// //   })
// //   res.json(result)
// // })

// //SIGNUP
// // app.post("/signup", async(req,res)=>{
// //   const {name, address} = req.body
// //   const result = await prisma.shop.create({
// //     data: {
// //       name,
// //       address,
// //     },
// //   })
// //   res.json(result)
// // })
// // const {PrismaClient} = require("@prisma/client")
// // const express = require("express");
// // const app = express();
// // const ShopRoute = require("./routes/shop");
// // const ProductRoute= require("./routes/product");
// // //const dotenv = require("dotenv");
// // //dotenv.config();









// // app.listen(8080,() => {
// //     console.log("Server is listening on 8080");
// // })
// // module.exports = express;


// //POST SHOP - Homepage
// // app.post("/", async (req,res) => {
// //   const { name, address} = req.body
// //   const result = await prisma.shop.create({
// //     data: { 
// //       name,
// //       address,
// //      },
// //   })
// //   res.json(result)
// // })





// // GET ALL SHOPS
// // app.get("/shops", async (req,res) =>{
// //     const shops = await prisma.shop.findMany()
// //     res.json(shops)
// // })

// // //GET A SHOP BY ID
// // app.get("/shops/:id", async (req,res)=>{
// //     const {id} = req.params
// //     const shop = await prisma.shop.findUnique({
// //         where: { id: String(id) },
// //     })
// //     res.json(shop)
// // })