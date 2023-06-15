const { connection } = require("../config/mysqlConfig");
class userService{
    constructor(){}

    insertUser(user){
        return new Promise(function(resolve,reject){
            let query = `INSERT INTO user (full_name, contact, email, password) VALUES('${user.fullName}','${user.contact}','${user.email}','${user.password}')`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(true);
                }
            });
        });
    }

    getAllUser(req,res){
        return new Promise(function(resolve,reject){
            let query = `SELECT * FROM user`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            });
        });
    }

    deleteUserById(userId){
        return new Promise(function(resolve,reject){
            let query = `DELETE FROM user WHERE id = '${userId}'`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(true);
                }
            });
        });
    }

    getSingleUser(userId){
        return new Promise(function(resolve,reject){
            let query = `SELECT * FROM user WHERE id = '${userId}'`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    let user = null;
                    if(result && result.length > 0){
                        user = result[0];
                    }
                    resolve(user);
                }
            });
        });
    }

    updateUserById(userId,user){
        return new Promise(function(resolve,reject){
            let query = `UPDATE user SET full_name = '${user.fullName}', contact = '${user.contact}', email = '${user.email}' WHERE id = '${userId}'`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(result);
                }
            });
        });
    }
}
module.exports = new userService();