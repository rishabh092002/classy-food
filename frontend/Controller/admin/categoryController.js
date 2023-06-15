const axios = require("axios");
const CategoryValidation = require("../../validation/categoryValidation");
const categoryService = require("../../services/admin/categoryService");


class categoryController {
    constructor() { }

    async categoriesPage(req, res) {
        let page = {
            title: "categories page",
            pageName: "create-category",
            message: ""
            // category: []
        }
        if (req.session.message) {
            page.message = req.session.message;
            delete req.session.message;
        }
        // const endpoint = "http://localhost:3005/admin/category";
        // const categoryRes = await axios.get(endpoint);
        // if(categoryRes.status && categoryRes.status == 200){    
        //     page.category = categoryRes.data;
        // }
        res.render("admin/template", page);
    }
    async createCategory(req, res) {
        try {
            let validation = CategoryValidation.validateCategory(req, res);
            if(validation && !validation.isValid) {
                req.session.message = validation.message
                res.redirect("/admin/create-category")
            }
            let product = await categoryService.createCategory(req, res);
            const endpoint = "http://localhost:3005/admin/category";
            await axios.post(endpoint,product);
            res.redirect("/admin/all-categories");
        } catch (error) {
            console.log("create category error", error);
        }
    }

    async allCategories(req, res) {
        let page = {
            title: "all categories page",
            pageName: "all-categories",
            category: []
        }
        const endpoint = "http://localhost:3005/admin/category";
        const categoryRes = await axios.get(endpoint);
        if (categoryRes.status && categoryRes.status == 200) {
            page.category = categoryRes.data;
        }
        res.render("admin/template", page);
    }

    async editCategory(req,res){
        let page = {
            title: "edit category page",
            pageName: "edit-category",
            message: "",
            category: ""
        }
        if (req.session.message) {
            page.message = req.session.message;
            delete req.session.message;
        }
        const categoryId = req.query.categoryId;
        let endpoint = "http://localhost:3005/admin/category/" + categoryId;
        const categoryRes = await axios.get(endpoint);
        if(categoryRes.status && categoryRes.status == 200){
            page.category = categoryRes.data;
        }
        res.render("admin/template",page)
    }

    async updateCategory(req,res){
        try {
            let validation = CategoryValidation.validateCategory(req, res);
            if(validation && !validation.isValid) {
                req.session.message = validation.message
                res.redirect("/admin/create-category")
            }
            const categoryId = req.query.categoryId
            let categories = await categoryService.updateCategoryById(req,res);
            const endpoint = "http://localhost:3005/admin/category/" + categoryId;
            await axios.put(endpoint,categories);
            res.redirect("/admin/all-categories");
        } catch(error){
            console.log("update error",error);
        }
    }

    async deleteCategory(req,res){
        const categoryId = req.query.categoryId;
        console.log("categoryId",categoryId);
        const endpoint = "http://localhost:3005/admin/category/" + categoryId
        await axios.delete(endpoint);
        res.redirect("/admin/all-categories");
    }

}
module.exports = new categoryController();