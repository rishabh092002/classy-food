const userService = require("../../services/admin/userService");
const userValidation = require("../../validation/userValidation");

class userController {
    constructor() { }
    async createUser(req, res) {
        try {
            const validate = userValidation.validateUserByParams(req.body);
            const response = {};
            if (validate && !validate.isValid) {
                response.message = validate;
                res.statusCode = 422;
                res.json(response);
                return;
            }
            await userService.insertUser(req, res);
            res.statusCode = 201;
            res.json({
                message: "user created"
            });
        } catch (error) {
            console.log("create user error", error);
        }
    }

    async getAllUser(req, res) {
        try {
            let userData = await userService.getAllUsers(req,res);
            res.statusCode = 200;
            res.json(userData);
        } catch (error) {
            console.log("All user error", error);
        }
    }

    async getSingleUser(req,res){
        try {
            let singleUser = await userService.getSingleUser(req,res);
            res.statusCode = 200;
            res.json(singleUser);
        } catch (error) {
            console.log("single user error",error);
        }
    }

    async deleteUser(req,res){
        try {
            await userService.deleteUserById(req,res);
            res.statusCode = 204;
            res.json({
                message: "user deleted"
            });
        } catch (error) {
            console.log('delete error',error);
        }
    }

    async updateUser(req,res){
        try {
            const validate = userValidation.validateUpdateUserByParams(req.body);
            const response = {};
            if (validate && !validate.isValid) {
                response.message = validate;
                res.statusCode = 422;
                res.json(response);
                return;
            }
            let user = await userService.updateUser(req, res);
            res.statusCode = 200;
            res.json(user);
        } catch (error) {
            console.log("update error",error);
        }
    }
}
module.exports = new userController();