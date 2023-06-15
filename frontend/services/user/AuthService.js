class AuthService {
    constructor(){}

    registerUser(req,res){
        let user = {
            fullName: req.body.fullName,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
        }
        return user;
    }

    userLogin(req,res){
        let user = {
            userName: req.body.email,
            password: req.body.password
        }
        return user;
    }
}
module.exports = new AuthService();