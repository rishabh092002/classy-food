const axios = require("axios");
const AuthService = require("../../services/user/AuthService");
const userValidation = require("../../validation/userValidation");

class AuthController {
    constructor(){}
    async loginPage(req, res) {
        let page = {
            title: "login page",
            pageName: "login",
            message: "",
            isLoggedIn: false
        }
        if(req.cookies.isLoggedIn){
            page.isLoggedIn = req.cookies.isLoggedIn
        }
        if (req.session.message) {
            page.message = req.session.message;
            delete req.session.message;
        }
        res.render("user/template", page);
    }

    async userLogin(req, res) {
        try {
            let userInfo = await AuthService.userLogin(req,res);
            const endpoint = "http://localhost:3005/user/login";
            let user = await axios.post(endpoint, userInfo);
            res.cookie("isLoggedIn",user.data.token);
            res.redirect("/");
        } catch (error) {
            console.log("login error", error.response.data.message);
            req.session.message = error.response.data.message;
            res.redirect("/login");
        }
    }

    async signup(req, res) {
        let page = {
            title: "register page",
            pageName: "register",
            message: "",
            isLoggedIn: false
        }
        if(req.cookies.isLoggedIn){
            page.isLoggedIn = req.cookies.isLoggedIn
        }
        if (req.session.message) {
            page.message = req.session.message;
            delete req.session.message;
        }
        res.render("user/template", page)
    }

    async register(req, res) {
        try {
            const validation = userValidation.validateUser(req, res);
            if (validation && !validation.isValid) {
                req.session.message = validation.message;
                res.redirect("/register");
                return false;
            }
            let user = await AuthService.registerUser(req, res)
            const endpoint = "http://localhost:3005/admin/user";
            await axios.post(endpoint, user);
            res.redirect("/login");
        } catch (error) {
            console.log("register error", error);
        }
    }

    async myProfile(req, res) {
        let page = {
            title: "profile page",
            pageName: "profile",
            // user: "",
            isLoggedIn: false
        }
        if(req.cookies.isLoggedIn){
            page.isLoggedIn = req.cookies.isLoggedIn
        }
        // const userId = req.cookies.isLoggedIn;
        // let endpoint = "http://localhost:3005/admin/user" + userId;
        // let userRes = await axios.get(endpoint);
        // if(userRes.status && userRes.status == 200){
        //     page.user = userRes.data;
        // };
        res.render("user/template", page);
    }

    async myOrders(req,res) {
        let page = {
            title: "my orders page",
            pageName: "myorders",
            isLoggedIn: false
        }
        if(req.cookies.isLoggedIn){
            page.isLoggedIn = req.cookies.isLoggedIn
        }
        let userId = req.body.userId;
        console.log("userId",userId);
        let endpoint = ""
        res.render("user/template",page);
    }

}
module.exports = new AuthController();