const { connection } = require("../config/mysqlConfig");

class categoryModel {
    constructor(){}

    insertCategory(data){
        return new Promise(function(resolve,reject){
            let query = `INSERT INTO category(title, description) VALUES('${data.title}','${data.description}')`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(true);
                }
            });
        });
    }

    getAllCategory(){
        return new Promise(function(resolve,reject){
            let query = `SELECT * FROM category`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{ 
                    resolve(result);
                }
            });
        });
    }

    deleteCategoryById(id){
        return new Promise(function(resolve,reject){
            let query = `DELETE FROM category WHERE id = '${id}'`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    resolve(true);
                }
            });
        });
    }

    getCategoryById(categoryId){
        return new Promise(function(resolve,reject){
            let query = `SELECT * FROM category WHERE id = '${categoryId}'`;
            connection.query(query,function(error,result){
                if(error){
                    reject(error);
                } else{
                    let category = {};
                    if(result && result.length > 0){
                        category = result[0];
                    }
                    resolve(category);
                }
            });
        });
    }

    updateCategoryById(categoryId,category){
        return new Promise(function(resolve,reject){
            let query = `UPDATE category SET title = '${category.title}', description='${category.description}' WHERE id = '${categoryId}'`;
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
module.exports = new categoryModel();