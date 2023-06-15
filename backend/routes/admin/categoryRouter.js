const express = require("express");
const app = express();
const categoryController = require("../../Controller/admin/categoryController");

app.post("/", categoryController.createCategory);

app.get("/", categoryController.getAllCategory);

app.delete("/:categoryId", categoryController.deleteCategory);

app.get("/:categoryId", categoryController.getCategoryById);

app.put("/:categoryId", categoryController.updateCategory);

module.exports = app;