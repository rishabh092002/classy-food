const axios = require("axios");
const productValidation = require("../../validation/productValidation");
const productServices = require("../../services/admin/productService");
var FormData = require('form-data');

class productController {
    constructor() { }

    async productPage(req, res) {
        let page = {
            title: "product page",
            pageName: "create-product",
            message: "",
            category: []
        };
        if (req.session.message) {
            page.message = req.session.message;
            delete req.session.message;
        }
        const endpoint = "http://localhost:3005/admin/category";
        const categoryRes = await axios.get(endpoint);
        if (categoryRes.status && categoryRes.status == 200) {
            page.category = categoryRes.data;
        }
        res.render("admin/template", page);
    }

    async createProduct(req, res) {
        try {
            //console.log("file & image ", req.files, req.body);
            let validation = productValidation.validateCreateProduct(req, res);
            if (validation && !validation.isValid) {
                req.session.message = validation.message;
                res.redirect("/admin/create-product");
                return false;
            }
            //  let product = await productServices.insertProduct(req, res)
            const endpoint = "http://localhost:3005/admin/product";

            /** image upload */
            let file = req.files.productImage;
            console.log("file", file);
            var form = new FormData();

            form.append("productImage", file.data, file.name);
            form.append('title', req.body.title);
            form.append('price', req.body.price);
            form.append('quantity', req.body.quantity);
            form.append('categoryId', req.body.categoryId);
            form.append('description', req.body.description);
            const config = {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }
            await axios.post(endpoint, form, config);
            res.redirect("/admin/all-products");
        } catch (error) {
            console.log("create product error", error, error.response.data);
        }
    }

    async getAllProducts(req, res) {
        let page = {
            title: "all products page",
            pageName: "all-products",
            products: []
        };
        const endpoint = "http://localhost:3005/admin/product";
        const productRes = await axios.get(endpoint);
        if (productRes.status && productRes.status == 200) {
            page.products = productRes.data;
        }
        res.render("admin/template", page);
    }

    async editProduct(req, res) {
        let page = {
            title: "edit product",
            pageName: "edit-product",
            product: "",
            message: "",
            category: []
        }
        if (req.session.message) {
            page.message = req.session.message;
            delete req.session.message
        }
        let productId = req.query.productId;
        let endpoint = "http://localhost:3005/admin/product/" + productId;
        let productRes = await axios.get(endpoint);
        if (productRes.status && productRes.status == 200) {
            page.product = productRes.data;
        }
        const categories = "http://localhost:3005/admin/category";
        const categoryRes = await axios.get(categories);
        if (categoryRes.status && categoryRes.status == 200) {
            page.category = categoryRes.data;
        }
        res.render("admin/template", page);
    }

    async updateProduct(req, res) {
        let productId = req.query.productId;
        let validation = productValidation.productValidation(req.body);
        if (validation && !validation.isValid) {
            req.session.message = validation.message;
            res.redirect("/admin/edit-product?productId=" + productId);
            return;
        }
        let product = await productServices.updateProductById(req, res);
        const endpoint = "http://localhost:3005/admin/product/" + productId;
        await axios.put(endpoint, product);
        res.redirect("/admin/all-products");
    }

    async deleteProduct(req, res) {
        let productId = req.query.productId;
        const endpoint = "http://localhost:3005/admin/product/" + productId;
        await axios.delete(endpoint);
        res.redirect("/admin/all-products");
    }
}
module.exports = new productController();