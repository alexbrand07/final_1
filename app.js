const express = require("express");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const shopsRouter = require("./routes/shops")

const app = express();

app.use(express.json());

app.use(productsRouter);
app.use(categoriesRouter)
app.use(shopsRouter)

module.exports = app