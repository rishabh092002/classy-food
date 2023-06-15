const { connection } = require("../../config/mysqlConfig");

class AuthModel {
    constructor() { }

    UserloginByEmail(email) {
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM user WHERE email = '${email}'`;
            console.log("query", query);
            connection.query(query, function (error, result) {
                if (error) {
                    reject(error)
                } else {
                    let user = null;
                    if (result && result.length > 0) {
                        user = result[0];
                    }
                    resolve(user);
                }
            });
        });
    }

    getMultipleProduct(productId){
        return new Promise(function(resolve,reject){
            let query = `SELECT * FROM products WHERE id IN (${productId}) `;
            connection.query(query, function(error,result){
                if(error){
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}
module.exports = new AuthModel();