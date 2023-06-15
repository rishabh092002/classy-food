const express = require("express");
const app = express();
const productRouter = require("./ProductRouter");
const categoryRouter = require('./categoryRouter');
const userRoter = require("./userRouter");

app.use("/product", productRouter);

app.use("/category", categoryRouter);

app.use("/user", userRoter);

module.exports = app;