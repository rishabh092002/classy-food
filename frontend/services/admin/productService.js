class productService {
    constructor(){}
    
    insertProduct(req,res){
        let product = {
            title: req.body.title,
            price: req.body.price,
            quantity: req.body.quantity,
            categoryId: req.body.categoryId,
            description: req.body.description,
            images: ""
        }
        return product;
    }

    updateProductById(req,res){
        let product = {
            title: req.body.title,
            price: req.body.price,
            quantity: req.body.quantity,
            categoryId: req.body.categoryId,
            description: req.body.description,
            images: ""
        }
        return product;
    }
}
module.exports = new productService();