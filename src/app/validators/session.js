const {compare,hash} = require('bcrypt');
const User = require('../models/User');

async function login (req,res,next) {
    const {email,password} = req.body;

    const user = await User.findOne({
        where: {email},
    })

    if(!user) return res.render("session/login",{
        error:"Usuário não cadastrado",
        user:req.body
    })

 
    const passed = await compare(password,user.password);

    if(!passed) return res.render("session/login",{
        user:req.body,
        error: "Senha incorreta"
    })
    
    req.user= user;
    next();

}

module.exports = {
    login
}