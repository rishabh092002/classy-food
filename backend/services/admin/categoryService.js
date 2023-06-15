const categoryModel = require("../../model/categoryModel");
class categoryService {
    constructor() { }

    async createCategory(req, res) {
        const category = {
            title: req.body.title,
            description: req.body.description,
            categoryId: req.body.categoryId
        }
        await categoryModel.insertCategory(category);
        return true;
    }

    async getAllCategory(req, res) {
        const data = await categoryModel.getAllCategory()
        return data;
    }

    async deleteCategoryById(req, res) {
        const categoryId = req.params.categoryId;
        console.log("categoryId", categoryId);
        await categoryModel.deleteCategoryById(categoryId);
        return true;
    }

    async getCategoryById(req,res){
        const categoryId = req.params.categoryId;
        const data = await categoryModel.getCategoryById(categoryId);
        return data;
    }

    async updateCategoryById(req,res){
        const categoryId = req.params.categoryId;
        console.log("categoryId",categoryId);
        const category = {
            title: req.body.title,
            description: req.body.description,
        }
        await categoryModel.updateCategoryById(categoryId,category);
        return true;
    }
}
module.exports = new categoryService();