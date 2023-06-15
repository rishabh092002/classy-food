class categoryService {
    constructor(){}
    createCategory(req,res){
        let categories = {
            title: req.body.title,
            description: req.body.description
        }
        return categories;
    }

    updateCategoryById(req,res){
        let categories = {
            title: req.body.title,
            description: req.body.description
        }
        return categories;
    }
}
module.exports = new categoryService();