const joi = require("joi");
class productValidation {
    constructor(){}

    productValidation(data){
        let response = {
            isValid: true,
            message: null
        }
        const product = joi.object({
            title: joi.string().required(),
            price: joi.number().required(),
            quantity: joi.number().required(),
            categoryId: joi.number().required(),
            description: joi.string().required(),
        })
        let validateRes = product.validate(data);
        console.log("validateRes", validateRes);
        if(validateRes && validateRes.error && validateRes.error.details){
            response.isValid = false;
            response.message = validateRes.error.details[0].message;
        }
        return response;
    }

    validateCreateProduct(req,res){
        let response = {
            isValid: true,
            message: null
        }
        const product = joi.object({
            title: joi.string().required(),
            price: joi.number().required(),
            quantity: joi.number().required(),
            categoryId: joi.number().required(),
            description: joi.string().required(),
        })
        let validateRes = product.validate(req.body);
        if(validateRes && validateRes.error && validateRes.error.details){
            response.isValid = false;
            response.message = validateRes.error.details[0].message;
        }
        console.log("validateRes", validateRes);
        return response;
    }

}
module.exports = new productValidation();