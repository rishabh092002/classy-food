const axios = require("axios");
const jwt = require("jsonwebtoken");
const orderService = require("../../services/user/orderService");
const productValidation = require("../../validation/productValidation");

class userController {
    constructor(){}

    async foodPage(req,res){
        try {
            let page = {
                title: "food page",
                pageName: "food",
                products: "",
                isLoggedIn: false
            }
            if(req.cookies.isLoggedIn){
                page.isLoggedIn = req.cookies.isLoggedIn
            }
            const endpoint = "http://localhost:3005/admin/product";
            const productRes = await axios.get(endpoint);
            if (productRes.status && productRes.status == 200) {
                page.products = productRes.data;
            }
            res.render("user/template",page);
        } catch (error) {
            console.log("food page error",error);
        }
    }

    async addToCart(req,res){
        try {
            let productId = req.body.proId;
            let allProductIds = [];
            if(req.cookies.cartProductIds){
                allProductIds = req.cookies.cartProductIds;
            }
            allProductIds.push(productId);
            allProductIds = [...new Set(allProductIds)];
            res.cookie("cartProductIds" , allProductIds);
            let response = {
                status: "Success"
            };
            res.json(response); 
        } catch (error) {
            console.log("add to cart page error",error);
        }
    }

    async cartPage(req,res){
        try {
            let page = {
                title: "cartPage",
                pageName: "cart",
                products: "",
                isLoggedIn: false
            }
            if(req.cookies.isLoggedIn){
                page.isLoggedIn = req.cookies.isLoggedIn
            }
            let productId = req.cookies.cartProductIds
            productId = productId.toString(",");
            let endpoint = "http://localhost:3005/user/multiple/" + productId;
            let productRes = await axios.get(endpoint);
            if (productRes.status && productRes.status == 200) {
                page.products = productRes.data;
            }
            res.render("user/template",page);
        } catch (error) {
            console.log("cart page error",error);
        }
    }

    async checkoutPost(req,res){
        try {
            let items = await orderService.products(req,res);
            res.redirect("/checkout");
        } catch (error) {
            console.log("post checkout error",error);
        }
    }

    async checkoutPage(req,res){
        try {
            let page = {
                title: "checkout page",
                pageName: "checkout",
                user: "",
                product: "",
                isLoggedIn: false
            }
            if(req.cookies.isLoggedIn){
            page.isLoggedIn = req.cookies.isLoggedIn
            }
            let productsId = req.cookies.items.productIds;
            let productQuantity = req.cookies.items.productQuantity;
            
            let endpoint = "http://localhost:3005/user/multiple/" + productsId; 
            const data = await axios.get(endpoint);
            let dataRes = await orderService.cartProducts(data, productQuantity);
            page.product = dataRes;
            res.render("user/template",page);
        } catch (error) {
            console.log("checkout error",error);
        }
    }

    async placeOrder(req,res){
        try {
            let products = await orderService.placeOrder(req,res);
            let endpoint = "http://localhost:3005/user/place-order";
            await axios.post(endpoint, products);
            res.redirect("/");
        } catch (error) {
            console.log("place order error",error);
        }
    }
}
module.exports = new userController();