const mysql = require('mysql');

const connection = mysql.createConnection(
    {
        host: "localhost",
        user: 'root',
        password: "admin",
        database: "classy_food"
    }
);

connection.connect(function(error){
    if(error){
        console.log("database connection failed");
    } else{ 
        console.log("database connected");
    }
});

module.exports.connection = connection;