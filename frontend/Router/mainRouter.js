const express = require("express");
const app = express();
const userRouter = require("./user/userRouter");
const adminRouter = require("./admin/adminRouter");

app.use("/", userRouter);
app.use("/admin", adminRouter);

module.exports = app;