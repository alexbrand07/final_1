const express = require("express");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");

const app = express();

app.use(express.json());
app.use(productsRouter);
app.use(categoriesRouter)

module.exports = app