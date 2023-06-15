const AdminValidation = require("../../validation/adminValidation");
const PrductService = require("../../services/admin/ProductService");
class ProductController {

    constructor(){}

    async createProduct(req,res){
        try {
            console.log("req.body", req.body);
            const validate = AdminValidation.validateCreateProductByParams(req.body);
            console.log("validate",validate);
            const response = {};
            if(validate && !validate.isValid){
                response.message = validate;
                res.statusCode = 422;
                res.json(response);
                return;
            }
            await PrductService.createProduct(req,res);
            res.statusCode = 201;
            res.json({
                message: "Product created"
            });

        } catch (error) {
            console.log("create product error",error);
        }
    }

    async getAllProducts(req,res){
        try {
            const data = await PrductService.getProducts(req,res);
            res.statusCode = 200;
            res.json(data);
        } catch (error) {
            console.log("get all pro error",error)
        }
    }

    async getProductById(req,res){
        try{
            const data = await PrductService.getProductsById(req,res)
            res.statusCode = 200;
            res.json(data);
        } catch(error){
            console.log("edit error",error);
        }
    }

    async updateProduct(req,res){
        try {
            const validate = AdminValidation.validateCreateProductByParams(req.body);
            console.log("validate",validate);
            const response = {};
            if(validate && !validate.isValid){
                response.message = validate;
                res.statusCode = 422;
                res.json(response);
                return;
            }
            const pro = await PrductService.updateProductById(req,res);
            res.statusCode = 200;
            res.json(pro);
        } catch (error) {
            console.log("update error",error);
        }
    }

    async deleteProduct(req,res){
       try {
        await PrductService.deleteProductById(req,res);
        res.statusCode = 204;
        res.json({});
       } catch (error) {
        console.log("delete product error",error);
       }
    }

}
module.exports = new ProductController();