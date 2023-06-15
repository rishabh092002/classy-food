const { connection } = require("../config/mysqlConfig");

class ProductModel {
    constructor() { }
    insertProduct(product) {
        return new Promise(function (resolve, reject) {
            let query = `INSERT INTO products(title, price, quantity, category_id, description, images) VALUES('${product.title}','${product.price}','${product.quantity}','${product.categoryId}','${product.description}','${product.images}')`;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            })
        })
    }

    getProducts() {
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM products`;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getProductsById(id) {
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM products WHERE id = '${id}'`;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    let product = {};
                    if (result && result.length > 0) {
                        product = result[0];
                    }
                    resolve(product);
                }
            });
        });
    }

    updateProductById(productId, product) {
        return new Promise(function (resolve, reject) {
            let query = `UPDATE products SET title = '${product.title}', price = '${product.price}', quantity = '${product.quantity}', category_id = '${product.categoryId}', description = '${product.description}'`;
            if (product.images) {
                query += `, images = '${product.images}' WHERE id = '${productId}'`;
            } else {
                query += `WHERE id = '${productId}'`;
            }
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })
    }

    deleteProductById(productId) {
        return new Promise(function (resolve, reject) {
            let query = `DELETE FROM products WHERE id = '${productId}'`;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    placeOrderByUser(product) {
        return new Promise(function (resolve, reject) {
            let query = `INSERT INTO billing_info(customerId, customerFullName, customerContact, customerPincode, billingFirstname, billingLastname, billingContact, billingPincode, billingAddress, shipingAddress, shipingCity, shipingPincode, shipingLandmark, paymentMethod) VALUES('${product.customerId}','${product.customerFullName}','${product.customerContact}','${product.customerPincode}','${product.billingFirstname}','${product.billingLastname}','${product.billingContact}','${product.billingPincode}','${product.billingAddress}','${product.shipingAddress}','${product.shipingCity}','${product.shipingPincode}','${product.shipingLandmark}','${product.paymentMethod}')`;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })
    }

    userOrder(order){
        return new Promise(function (resolve, reject) {
            let query = `INSERT INTO order_info(customerId, title, price, quantity, total) VALUES('${order.customerId}','${order.title}','${order.price}','${order.quantity}','${order.total}')`;
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            })
        })
    }
}
module.exports = new ProductModel();