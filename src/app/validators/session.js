const {compare,hash} = require('bcrypt');
const User = require('../models/User');
const {checkAllFields } = require('../lib/utils');

async function login (req,res,next) {
    const {password} = req.body;

    let { email } = req.body;
    email = email.toLowerCase();
    req.body.email = email;


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
async function forgot(req,res,next) {
    const { email } = req.body;

    const user = await User.findOne({
        where: {email}
    }) 

    if(!user) return res.render("session/forgot-password",{
        error:"E-mail não cadastrado!",
        user:req.body
    })

    req.user = user;
    next();
}
async function reset (req,res,next) {
    const {password, passwordRepeat, token} = req.body;
    const reset_token = token;

    //Procurando o usuário correspondente ao Token
    const user = await User.findOne({
        where:{reset_token},
    })

    //Verificando se todos os campos estão preenchidos
    const fillFields = checkAllFields(req.body);
    if (fillFields) return res.render("session/reset-password",fillFields);

    //Verificando se o Token bateu
    if(!user) return res.render("session/reset-password",{
        user:req.body,
        error: 'Token inválido! Solicite uma nova recuperação de senha'
    })

    //Verificando se o Token Expirou
    let now = new Date();
    now = now.setHours(now.getHours());

    if (now > user.reset_token_expires ) return res.render("session/reset-password",{
        user:req.body,
        error: 'O Token expirou! Por favor, solicite um novo'
    })

    //Verificando se a senha bate
    if(password != passwordRepeat) return res.render("session/reset-password",{
        user:req.body,
        token,
        error: `As senhas não se batem`
    })

    req.user = user;
    next();



}

module.exports = {
    login,
    forgot,
    reset
}