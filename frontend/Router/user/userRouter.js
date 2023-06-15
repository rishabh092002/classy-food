const express = require("express");
const app = express();
const AuthController = require("../../Controller/user/AuthController");
const userController = require("../../Controller/user/userController");

app.get("/", async function(req,res){
    try {
        let page = {
            title: "home page",
            pageName: "home",
            isLoggedIn: false
        }
        if(req.cookies.isLoggedIn){
            page.isLoggedIn = req.cookies.isLoggedIn
        }
        res.render("user/home", page);
    } catch (error) {
        console.log("home page error",error);
    }
});


app.get("/login", AuthController.loginPage);

app.post("/login", AuthController.userLogin);

app.get("/register", AuthController.signup);

app.post("/register", AuthController.register);

app.get("/food", userController.foodPage);

app.post("/add-to-cart", userController.addToCart);

app.get("/cart", userController.cartPage);

app.get("/checkout", userController.checkoutPage);

app.post("/checkout", userController.checkoutPost);

app.post("/place-order", userController.placeOrder);

app.get("/profile", AuthController.myProfile);

app.get("/myorders", AuthController.myOrders);

module.exports = app;