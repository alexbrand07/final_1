const app = require("./app");

app.listen(3000,() => {
  console.log("Server is listening on 3000");
})


// app.post("/product", async (req,res) => {
//   const { name, description, category, shopId } = req.body
//   const result = await prisma.product.create({
//     data: {
//       name,
//       description,
//       shopId,
//       category,
//     },
//   })
//   res.json(result)
// })

//SIGNUP
// app.post("/signup", async(req,res)=>{
//   const {name, address} = req.body
//   const result = await prisma.shop.create({
//     data: {
//       name,
//       address,
//     },
//   })
//   res.json(result)
// })
