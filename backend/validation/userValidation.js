const joi = require("joi")

class userValidation {
    constructor(){}
    
    validateUserByParams(data){
        const response = {
            isValid: true,
            message: null
        }
        const schema = joi.object({
            fullName: joi.string().required(),
            contact: joi.number().required(),
            email: joi.string().required(),
            password: joi.string().required(),
        });
        const validateRes = schema.validate(data);
        if(validateRes && validateRes.error && validateRes.error.details){
            response.isValid = false;
            response.message = validateRes.error.details[0].message;
        }
        return response;
    }

    validateUpdateUserByParams(data){
        const response = {
            isValid: true,
            message: null
        }
        const schema = joi.object({
            fullName: joi.string().required(),
            contact: joi.number().required(),
            email: joi.string().required(),
        });
        const validateRes = schema.validate(data);
        if(validateRes && validateRes.error && validateRes.error.details){
            response.isValid = false;
            response.message = validateRes.error.details[0].message;
        }
        return response;
    }
}
module.exports = new userValidation();