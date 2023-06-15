const express = require("express");
const app = express();
const AdminRouter = require("./admin/adminRouter");
const userRouter = require("./user/AuthRouter");

app.use("/admin", AdminRouter);

app.use("/user", userRouter);

module.exports = app;