const ProductService = require("../../services/admin/ProductService");
const authService = require("../../services/user/Authservice");

class AuthController {
    constructor() { }

    async Userlogin(req, res) {
        try {
            const data = await authService.Userlogin(req, res);
            console.log("data", data);
            res.statusCode = data.statusCode;
            delete data.statusCode;
            res.json(data);
        } catch (error) {
            console.log("login error", error);
        }
    }

    async getMultipleProduct(req, res) {
        try {
            let multipleProduct = await authService.getMultipleProduct(req, res);
            res.statusCode = 200;
            res.json(multipleProduct);
        } catch (error) {
            console.log("multiple user error", error);
        }
    }

    async placeOrder(req, res) {
        try {
            await ProductService.placeOrder(req, res);
            res.statusCode = 201;
            res.json({
                message: "order placed"
            });
        } catch (error) {
            console.log("place order error", error);
        }
    }
}
module.exports = new AuthController();