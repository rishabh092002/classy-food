const AuthModel = require("../../model/user/AuthModel");
const jwt = require("jsonwebtoken");

class Authservice {
    constructor() { }
    async Userlogin(req, res) {
        let response = {};
        const userName = req.body.userName;
        const password = req.body.password;
        let user = await AuthModel.UserloginByEmail(userName);
        console.log("user", user);
        if (user) {
            if (user.password == password) {
                const token = jwt.sign({
                    fullName: user.fullName,
                    contact: user.contact,
                    email: user.email,
                    userId : user.id,
                }, "classy-food-2023-open");
                console.log("token", token);
                response.statusCode = 200;
                response.token = token;
            } else {
                response.statusCode = 400;
                response.message = "incorrect password";
            }
        } else {
            response.statusCode = 400;
            response.message = "incorrect email address";
        }
        return response;
    }

    async getMultipleProduct(req,res){
        let productId = req.params.productId;
        let data = await AuthModel.getMultipleProduct(productId);
        return data;
    }
}
module.exports = new Authservice();