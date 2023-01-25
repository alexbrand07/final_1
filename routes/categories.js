const express = require("express");

const router = express.Router();
const prisma = require("../db/prismaClient");

//GET ALL CATEGORIES 
router.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany()
  res.json(categories)
})

//GET category BY ID
router.get("/categories/:id", async (req,res)=>{
  const {id} = req.params
  const category = await prisma.category.findUnique({
      where: { id: Number(id) },
  })
  res.json(category)
})


module.exports = router;