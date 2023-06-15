const express = require("express");
const app = express();
const AuthController = require("../../Controller/user/AuthController");

app.post("/login", AuthController.Userlogin);

app.get("/multiple/:productId", AuthController.getMultipleProduct);

app.post("/place-order", AuthController.placeOrder);

module.exports = app;