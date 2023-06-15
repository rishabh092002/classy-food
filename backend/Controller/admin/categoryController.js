const adminValidation = require("../../validation/adminValidation");
const categoryService = require("../../services/admin/categoryService");

class categoryController {
    constructor(){}
    async createCategory(req,res){
        try {
            const validate = adminValidation.validateCreateCategoryByParams(req.body);
            const response = {};
            if(validate && !validate.isValid){
                response.message = validate; 
                res.statusCode = 422;
                res.json(response);
                return
            }
            await categoryService.createCategory(req,res)
            res.statusCode = 201;
            res.json({
                message: "Category created"
            });
        } catch (error) {
            console.log("create category Error",error);
        }
    }

    async getAllCategory(req,res){
        try {
        const data = await categoryService.getAllCategory(req,res)
        res.statusCode = 200;
        res.json(data);
        } catch (error) {
            console.log("all category error",error);
        }
    }

    async deleteCategory(req,res){
        try {
            await categoryService.deleteCategoryById(req,res);
            res.statusCode = 204;
            res.json({});
        } catch (error) {
            console.log("delete category error",error);
        }
    }

    async getCategoryById(req,res){
        try {
            const data = await categoryService.getCategoryById(req,res);
            res.statusCode = 200;
            res.json(data);
        } catch (error) {
            console.log("category error",error);
        }
    }

    async updateCategory(req,res){
        try {
            const validate = adminValidation.validateCreateCategoryByParams(req.body);
            const response = {};
            if(validate && !validate.isValid){
                response.message = validate; 
                res.statusCode = 422;
                res.json(response);
                return
            }
            const data = await categoryService.updateCategoryById(req,res)
            res.statusCode = 200;
            res.json(data);
        } catch (error) {
            console.log("update category Error",error);
        }
    }
}
module.exports = new categoryController();