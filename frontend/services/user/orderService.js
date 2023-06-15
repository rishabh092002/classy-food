class orderService {
    constructor() { }
    products(req, res) {
        let items = {
            productIds: req.body.productId,
            productQuantity: req.body.productQuantity,
        }
        res.cookie("items", items);
    }

    cartProducts(data, productQuantity) {
        let product = data.data
        let quantity = productQuantity
        let pro = []
        product.forEach((singleProduct, i) => {
            let item = {
                image: singleProduct.images,
                id: singleProduct.id,
                title: singleProduct.title,
                price: singleProduct.price,
                proQuantity: quantity[i],
                total: singleProduct.price * quantity[i]
            }
            pro.push(item);
        });
        return pro;
    }

    placeOrder(req, res) {
        let billingInfo = {
            // customerId: req.body.customerId,
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
            title: req.body.title,
            price: req.body.price,
            quantity: req.body.proQuantity,
            total: req.body.total,
        }
        return billingInfo
    }
}
module.exports = new orderService();