const joi = require("joi")

class userValidation {
    constructor(){}

    validateUser(req,res){
        let response = {
            isValid: true,
            message: null
        }
        let schema = joi.object({
            fullName: joi.string().required(),
            contact: joi.number().required(),
            email: joi.string().required(),
            password: joi.string().required(),
            confirmPassword: joi.string().required(),
        });
        let validationRes = schema.validate(req.body);
        if(validationRes && validationRes.error && validationRes.error.details){
            response.isValid = false;
            response.message = validationRes.error.details[0].message;
        }
        return response;
    }

    UpdateUserValidation(req,res){
        let response = {
            isValid: true,
            message: null
        }
        let schema = joi.object({
            fullName: joi.string().required(),
            contact: joi.number().required(),
            email: joi.string().required(),
        });
        let validationRes = schema.validate(req.body);
        if(validationRes && validationRes.error && validationRes.error.details){
            response.isValid = false;
            response.message = validationRes.error.details[0].message;
        }
        return response;
    }
}
module.exports = new userValidation();