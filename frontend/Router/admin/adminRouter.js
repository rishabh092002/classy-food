const express = require("express")
const app = express();
const productController = require("../../Controller/admin/productController");
const categoryController = require("../../Controller/admin/categoryController");
const userController = require("../../Controller/admin/userController");

app.get("/", function(req,res){
    let page = {
        title: "home page",
        pageName: "home"
    }
    res.render("admin/home",page);
});

/** Products */
app.get("/create-product", productController.productPage);
app.post("/create-product", productController.createProduct);
app.get("/all-products", productController.getAllProducts);
app.get("/edit-product", productController.editProduct);
app.get("/delete-product", productController.deleteProduct);
app.post("/update-product", productController.updateProduct);

/** Category */
app.get("/create-category", categoryController.categoriesPage);
app.post("/create-category", categoryController.createCategory);
app.get("/all-categories", categoryController.allCategories);
app.get("/edit-category", categoryController.editCategory);
app.get("/delete-category", categoryController.deleteCategory);
app.post("/update-category", categoryController.updateCategory);

/** User */
app.get("/all-user", userController.alluserPage);
app.get("/create-user", userController.createUser);
app.post("/create-user", userController.insertUser);
app.get("/edit-user", userController.editUser);
app.post("/update-user", userController.updateUser);
app.get("/delete-user", userController.deleteUser);



module.exports = app;