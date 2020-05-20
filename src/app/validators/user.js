const User = require('../models/User');
const {checkAllFields} = require('../lib/utils');





async function post (req,res,next) {
    let { email } = req.body;
    const fillFields = checkAllFields(req.body);
    if (fillFields) return res.render('administrator/user/create',fillFields)

    email = email.toLowerCase();
    req.body.email = email;
    //Checando se já existe usuário cadastrado com o mesmo e-mail
    const checkUser = await User.findOne({
        where: {email}
    })

    if (checkUser) return res.render('administrator/user/create',{
        error: `Email: ${email} já cadastrado`,
        user:req.body
    })

    next();
}
async function put (req,res,next) {
    const keys = Object.keys(req.body);
   
        for(key of keys)  {
            if(req.body[key] == "" && key != "password") {
                return res.render("administrator/user/account",{
                        error:"Por favor, não deixe vazio o nome ou email",
                        user:req.body,
                    })               
            }
        }

     next();
}
async function preventDeleteAdm(req,res,next) {
    const id = req.session.userId;
    const user = await User.findOne({
        where:{id}
    })

    if (user.is_admin == true) return res.render("administrator/user/edit",{
        error:"Você não pode se excluir!",
        user
    });

    next();
}

module.exports = {
    post,
    put,
    preventDeleteAdm
}