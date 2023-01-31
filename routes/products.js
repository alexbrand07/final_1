const express = require("express");
const router = express.Router();
const prisma = require("../db/prismaClient");


// POST PRODUCT
router.post("/product", async (req,res) => {
  const { name, description, categories, shopId} = req.body;
  try {
    const result = await prisma.product.create({
      data: {
        name,
        description,
        categories: {
          create : categories.map( c => {return {category: {connect: { id: c } }}})
        },
        shop: {
          create: {
            shop : {connect : {
              id : shopId
            }}
          }
        },
        expirationDate: new Date(new Date().getTime() + 2* 60000)
        // // how to add shop that this product belongs to
      },
    })
    res.json(result)

  } catch (error) {
     res.status(500).send({error: error.message });
  }
  
})

//GET ALL PRODUCTS
router.get("/products", async (req, res) => {
    try { 
    const products = await prisma.product.findMany()
    res.json(products)
    } catch (error) {
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
  const { name, description} = req.body;
  const result = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      name,
      description,
    },
  })
  res.json(result)
})

// DELETING EXPIRED PRODUCT
router.delete("/products/cleanup", async(req,res) => {
  const { count } = await prisma.product.deleteMany({
    where: {
      expirationDate: {
        lte: new Date()
      }
    }
  })
  
  res.json({cleaned:count})
})

// DELETE ONE PRODUCT
router.delete("/products/:id", async (req, res) => {
  const {id} = req.params
  try { const deleted_products = await prisma.product.deleteMany({
    where: { id: Number(id) },
  });
    res.json(deleted_products)
  } catch (error) {
    console.error(error);
    res.status(500).send({error: error.message });
  }
})

// ENDPOINT THAT RUNS TRIGGER AND DELETES EXPIRED PRODUCT


// router.post('/product/expired/all', async (req, res) => {
// const expiredProducts = await prisma.product.deleteMany({
//   where: {
//     expirationDate: {
//       lte: new Date()
//     }
//   }
// });
//     res.status(200).json({ message: 'Expired products deleted successfully.' });
//   });

// router.post('/expired/all/all', async (req, res) => {
//   // const expired_d = req.body.expired_d;
//   const today = new Date();
//   const result = await prisma.$queryRaw`DELETE FROM Product WHERE expirationDate < ${today}`
//   deleteExpiredProducts(today).then(() => {
//     console.log('Expired products deleted successfully.');
//   });
//   res.status(200).json({ message: 'Expired products deleted successfully.' });
// });


router.post('/delete/expired/all', async (req, res) => {
  // const expired_d = req.body.expired_d;
  const today = new Date();
  const result = await prisma.$queryRaw`CALL public.deleteexpiredproducts( '2023-02-01' )`
  // console.log('Expired products deleted successfully.');
  res.status(200).json({ message: 'Expired products deleted successfully.' });
});








// router.post('/delete', async (req, res) => {
//   const expired_d = req.body.expired_d;

//   await prisma.product.deleteMany({
//     where: {
//       expirationDate: {
//         lt: expired_d
//       }
//     }
//   });


 


// router.post('/delete_expired', async (req, res) => {
//   const expired_d = req.body.expired_d;
//   await prisma.queryRaw(` CALL DeleteExpiredProducts('${expired_d}'); `);
//   deleteExpiredProducts('2023-01-30').then(() => {
//     console.log('Expired products deleted successfully.');
//   });
//   res.status(200).json({ message: 'Expired products deleted successfully.' });
// });

// router.post('/delete_expired', (req, res) => {
//   const query = `DELETE FROM Product WHERE expirationDate < expired_d();`;

//   prisma.$queryRaw
//     .then((result) => {
//       res.status(200).json({
//         message: `Successfully deleted ${result.rowCount} expired products.`
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: error.message
//       });
//     });
// });

module.exports = router;