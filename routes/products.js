const express = require("express");

const router = express.Router();
const prisma = require("../db/prismaClient");

router.get("/", async (req,res) =>{
  res.status(200).json({
    "name": "Online Shop",
    "location": "Made in Spain, Canary Islands" 
  })
})

// POST PRODUCT
router.post("/product", async (req,res) => {
  const { name, description, categories} = req.body;
  const result = await prisma.product.create({
    data: {
      name,
      description,
      categories: {
        create : categories.map(c => {return {category: {connect: { id: c } }}})
      }
    },
  })
  res.json(result)
})

//GET ALL PRODUCTS
router.get("/products", async (req, res) => {
    try { const products = await prisma.product.findMany()
    res.json(products)
    } catch (error) {
      console.error(error);
      res.status(500).send({error: error.message });
    }
})

//GET A PRODUCT BY ID
router.get("/products/:id", async (req,res)=>{
    const {id} = req.params
    const product = await prisma.product.findUnique({
        where: {
          id: Number(id)
        },
        include : {
          categories: {
            select : {
            categoryId: true
          }
        }
      }
    })
    res.json(product)
})

// UPDATE Product BY ID
router.put("/products/:id", async(req,res)=>{
  const {id} = req.params;
  const { name, address} = req.body;
  const result = await prisma.shop.update({
    where: { id: Number(id) },
    data: {
      name,
      address,
    },
  })
  res.json(result)
})

module.exports = router;