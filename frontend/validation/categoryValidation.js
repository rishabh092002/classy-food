const joi = require("joi");

class categoryValidation {
    constructor(){}

    validateCategory(req,res){
        let response = {
            isValid: true,
            message: null
        }
        const categories = joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
        });
        let validateRes = categories.validate(req.body);
        if(validateRes && validateRes.error && validateRes.error.details){
            response.isValid = false;
            response.message = validateRes.error.details[0].message;
        }
        return response;
    }
}
module.exports = new categoryValidation();