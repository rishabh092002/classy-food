const express = require("express");
const app = express();
const ProductController = require("../../Controller/admin/ProductController");

app.post("/", ProductController.createProduct);

app.get("/", ProductController.getAllProducts);

app.delete("/:productId", ProductController.deleteProduct);

app.get("/:productId", ProductController.getProductById);

app.put("/:productId", ProductController.updateProduct);

module.exports = app;