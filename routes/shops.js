const express = require("express");
const router = express.Router();
const prisma = require("../db/prismaClient");

//homepage
router.get("/home", async (req,res) =>{
  res.status(200).json({
    "name": "Online Shops",
    "location": "Made in Spain, Canary Islands" 
  })
})

//POST SHOP
router.post("/shops", async (req,res) => {
  const { name, description} = req.body;
  try {
    const result = await prisma.shop.create({
    data: {
      name,
      description
    },
  })
  res.json(result)
} catch (error) {
  res.status(500).send({error: error.message });
}

})

//GET ALL SHOPS
router.get("/shops", async (req, res) => {
    try { const shops = await prisma.shop.findMany()
    res.json(shops)
    } catch (error) {
      res.status(500).send({error: error.message });
    }
})

//GET A SHOP BY ID
router.get("/shops/:id", async (req,res)=>{
    const {id} = req.params
    const shop = await prisma.shop.findUnique({
        where: {
          id: Number(id)
        },
    })
    res.json(shop)
})

//UPDATE SHOP BY ID ?????
router.put("/shops/:id", async(req,res)=>{
  const {id} = req.params;
  const { name, description} = req.body;
  const result = await prisma.shop.update({
    where: { id: Number(id) },
    data: {
      name,
      description
    },
  })
  res.json(result)
})


// DELETE SHOP/SHOPS

router.delete("/shops/:id", async (req, res) => {
  const {id} = req.params;
  try { const shop = await prisma.shop.delete({
    where: { id: Number(id) },
  });
    console.log("shop has been deleted");
    res.json(shop)
  } catch (error) {
    console.error(error);
    res.status(500).send({error: error.message });
  }
})
// DELETE ALL
router.delete("/shops/cleanup/all", async (req, res) => {
  const { count } = await prisma.shop.deleteMany({});

  res.json({ cleaned: count });
});


module.exports = router;





// router.delete("/shops/remove_all", async (req, res) => {
//   const {id} = req.params;
//   try { 
//     const deleted_shops = await prisma.shop.deleteMany({
//     where: {},
//   });
//     res.json(deleted_shops)
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({error: error.message });
//   }
// })