const joi = require("joi");

class AdminValidation {
    constructor(){}
    validateCreateProductByParams(data){
        const response = {
            isValid: true,
            message: null
        };
        const schema = joi.object({
            title: joi.string().required(),
            price: joi.number().required(),
            quantity: joi.number().required(),
            categoryId: joi.number().required(),
            description: joi.string().required(),
        });
        const validateRes = schema.validate(data);
        if(validateRes && validateRes.error && validateRes.error.details){
            response.isValid = false;
            response.message = validateRes.error.details[0].message;
        }
        return response;
    }

    validateCreateCategoryByParams(data){
        const response = {
            isValid: true,
            message: null
        };
        console.log("data",data);
        const schema = joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
        });
        const validateRes = schema.validate(data);
        if(validateRes && validateRes.error && validateRes.error.details){
            response.isValid = false;
            response.message = validateRes.error.details[0].message;
        }
        return response;
    }

    validateUpdateProductByParams(data){
        const response = {
            isValid: true,
            message: null
        }
        const schema = joi.object({
            title: joi.string().required(),
            price: joi.number().required(),
            quantity: joi.number().required(),
            categoryId: joi.number().required(),
            description: joi.string().required(),
        });
        const validateRes = schema.validate(data);
        if(validateRes && validateRes.error && validate.error.details){
            response.isValid = false;
            response.message = validateRes.error.details[0].message;
        }
        return response;
    }
}

module.exports = new AdminValidation();