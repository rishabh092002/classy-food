const userModel = require("../../model/userModel");

class userService {

    async insertUser(req,res){
        let user = {
            fullName: req.body.fullName,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
        }
        await userModel.insertUser(user);
        return true;
    }

    async getAllUsers(req,res){
        const data = await userModel.getAllUser();
        return data;
    }

    async deleteUserById(req,res){
        const userId = req.params.userId;
        await userModel.deleteUserById(userId);
        return true;
    }

    async getSingleUser(req,res){
        const userId = req.params.userId;
        const userData = await userModel.getSingleUser(userId);
        return userData;
    }

    async updateUser(req,res){
        const userId = req.params.userId;
        let product = {
            fullName: req.body.fullName,
            contact: req.body.contact,
            email: req.body.email,
        }
        const userData = await userModel.updateUserById(userId,product);
        return userData;
    }
}
module.exports = new userService();