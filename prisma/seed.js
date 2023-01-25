const { PrismaClient } = require("@prisma/client");
//import { PrismaClient } from "../generated/client";
const prisma = new PrismaClient();

async function main() {


const categories = [ 
{id: 1, name: "Running"},
{id: 2, name: "Shoes"},
{id: 3, name: "Hiking"},
{id: 4, name: "NBA"}
];

const collection = await prisma.$transaction(
  categories.map(cat =>
    prisma.category.upsert({
      where: { id: cat.id },
      update: {name: cat.name},
      create: {id: cat.id, name: cat.name}
    })
  ))
}

main()
.catch(e => {
    console.error(e.message)
})
.finally(async () =>{
    await prisma.$disconnect()
})
