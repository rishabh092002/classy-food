const axios = require("axios");
const userValidation = require("../../validation/userValidation");
const userService = require("../../services/admin/userService");

class userController {
    constructor() { }

    async createUser(req, res) {
        let page = {
            title: "user page",
            pageName: "create-user",
            message: ""
        }
        if (req.session.message) {
            page.message = req.session.message;
            delete req.session.message;
        }
        res.render("admin/template", page);
    }

    async insertUser(req, res) {
        try {
            const validation = userValidation.validateUser(req, res);
            if (validation && !validation.isValid) {
                req.session.message = validation.message;
                res.redirect("/admin/create-user");
                return false;
            }
            let user = await userService.insertUser(req, res)
            const endpoint = "http://localhost:3005/admin/user";
            await axios.post(endpoint, user);
            res.redirect("/admin/all-user");
        } catch (error) {
            console.log("insert user error", error);
        }
    }

    async editUser(req, res) {
        try {
            let page = {
                title: "edit user page",
                pageName: "edit-user",
                user: "",
                message: ""
            }
            if (req.session.message) {
                page.message = req.session.message;
                delete req.session.message;
            }
            let userId = req.query.userId;
            let endpoint = "http://localhost:3005/admin/user/" + userId;
            const userRes = await axios.get(endpoint);
            if (userRes.status && userRes.status == 200) {
                page.user = userRes.data;
            }
            res.render("admin/template", page);
        } catch (error) {
            console.log("edit user error");
        }
    }

    async updateUser(req, res) {
        try {
            let userId = req.query.userId;
            console.log("userId", userId);
            let userValidate = userValidation.UpdateUserValidation(req, res);
            if (userValidate && !userValidate.isValid) {
                req.session.message = userValidate.message;
                res.redirect("/admin/edit-user?userId=" + userId);
                return false;
            }
            let user = await userService.updateUser(req, res);
            console.log("user", user);
            let endpoint = "http://localhost:3005/admin/user/" + userId;
            await axios.put(endpoint, user);
            res.redirect("/admin/all-user");
        } catch (error) {
            console.log("update user error", error);
        }
    }

    async deleteUser(req,res){
        let userId = req.query.userId;
        let endpoint = "http://localhost:3005/admin/user/" + userId;
        await axios.delete(endpoint);
        res.redirect("/admin/all-user");
    }

    async alluserPage(req, res) {
        let page = {
            title: "all user page",
            pageName: "all-user",
            user: ""
        }
        const endpoint = "http://localhost:3005/admin/user";
        let userRes = await axios.get(endpoint);
        if (userRes.status && userRes.status == 200) {
            page.user = userRes.data;
        }
        res.render("admin/template", page);
    }

}
module.exports = new userController();