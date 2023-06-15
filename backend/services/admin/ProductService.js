const ProductModel = require("../../model/ProductModel");
const imageService = require("./imageService");

class ProductService {
    constructor (){}

    async createProduct(req,res){
        const product = {
            title: req.body.title,
            price: req.body.price,
            quantity: req.body.quantity,
            categoryId: req.body.categoryId,
            description: req.body.description,
            images: ""
        };
        const allImageName = [];
        const proImage = req.files.productImage;
        if(proImage && proImage.length > 1){
            for(let singleImg of proImage){
                let imgNewName = await imageService.generateImageName(singleImg.name);
                singleImg.name = imgNewName;
                await imageService.uploadImage(singleImg);
                allImageName.push(imgNewName);
            }
        } else {
            let imgNewName = await imageService.generateImageName(proImage.name);
                proImage.name = imgNewName
                await imageService.uploadImage(proImage);
                allImageName.push(imgNewName);
        }
        let imgData = allImageName.toString(",");
        product.images = imgData;
        await ProductModel.insertProduct(product);
        return true;
    }

    async getProducts(req,res){
        const data = await ProductModel.getProducts();
        return data;
    }

    async getProductsById(req,res){
        const productId = req.params.productId
        console.log("productId",productId)
        const data = await ProductModel.getProductsById(productId);
        return data;
    }

    async updateProductById(req,res){
        const productId = req.params.productId;
        console.log("productId",productId);
        const product = {
            title: req.body.title,
            price: req.body.price,
            quantity: req.body.quantity,
            categoryId: req.body.categoryId,
            description: req.body.description,
            images: ""
        };
        if(req.files && req.files.productImage){
            const allImageName = [];
            const proImage = req.files.productImage;
            if(proImage && proImage.length > 1){
                for(let singleImg of proImage){
                    let imgNewName = await imageService.generateImageName(singleImg.name);
                    singleImg.name = imgNewName;
                    await imageService.uploadImage(singleImg);
                    allImageName.push(imgNewName);
                }
            } else {
                let imgNewName = await imageService.generateImageName(proImage.name);
                    proImage.name = imgNewName
                    await imageService.uploadImage(proImage);
                    allImageName.push(imgNewName);
            }
            let imgData = allImageName.toString(",");
            product.images = imgData;
        }
        const data = await ProductModel.updateProductById(productId,product);
        return data;
    }
    
    async deleteProductById(req,res){
        const productId = req.params.productId;
        console.log("productId",productId);
        await ProductModel.deleteProductById(productId);
        return true;
    }

    async placeOrder(req,res){
        let product = {
            customerId: "",
            customerFullName: req.body.customerFullName,
            customerContact: req.body.customerContact,
            customerPincode: req.body.customerPincode,
            billingFirstname: req.body.billingFirstname,
            billingLastname: req.body.billingLastname,
            billingContact: req.body.billingContact,
            billingPincode: req.body.billingPincode,
            billingAddress: req.body.billingAddress,
            shipingAddress: req.body.shipingAddress,
            shipingCity: req.body.shipingCity,
            shipingPincode: req.body.shipingPincode,
            shipingLandmark: req.body.shipingLandmark,
            paymentMethod: req.body.paymentMethod,
            productId: req.body.productId,
        }
        let proId = product.productId
        let itemId = await ProductModel.placeOrderByUser(product);
        let orderId = itemId.insertId
        for(let i = 0; i < proId.length; i++){
            const productIds = proId[i];
        let order = {
            proId: productIds,
            ordersId: orderId,
            customerId: req.body.customerId,
            title: req.body.title[i],
            price: req.body.price[i],
            quantity: req.body.quantity[i],
            total: req.body.total[i]
        }
        console.log("order",order);
        await ProductModel.userOrder(order);
    }
        return true;
    }
}
module.exports = new ProductService();