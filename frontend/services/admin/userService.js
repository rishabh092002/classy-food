class userService {
    constructor(){}

    insertUser(req,res){
        let user = {
            fullName: req.body.fullName,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
        }
        return user;
    }

    updateUser(req,res){
        let user = {
            fullName: req.body.fullName,
            contact: req.body.contact,
            email: req.body.email,
        }
        return user;
    }
    
}
module.exports = new userService();