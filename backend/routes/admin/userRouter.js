const express = require("express");
const app = express();
const userController = require("../../Controller/admin/userController");

app.post("/", userController.createUser);

app.get("/", userController.getAllUser);

app.delete("/:userId", userController.deleteUser);

app.get("/:userId", userController.getSingleUser);

app.put("/:userId", userController.updateUser);

module.exports = app;