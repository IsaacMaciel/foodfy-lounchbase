const crypto = require('crypto');

const User = require('../models/User');
const mailer = require('../lib/mailer');
const bcrypt = require('bcryptjs');

module.exports = {
    index(req,res) {
        return res.render("session/login");
    },
    login(req,res) {
        //Passando dados da sessão para as demais rotas
        req.session.userId = req.user.id;
        req.session.is_admin = req.user.is_admin;

       return res.redirect("/admin/users/myaccount");

    },
    logout(req,res) {
        req.session.destroy();
        return res.redirect('/admin');
    },
    forgotForm(req,res) {
        return res.render("session/forgot-password");
    },
    async forgot(req,res) {
        try {
            //Pegando o usuário do banco ja consultado no banco pelo Validator
            const user = req.user;
            //Criando um token
            const token = crypto.randomBytes(20).toString("hex");
            //Pegando o tempo atual para setar 30 minutos de expiração do token
            let now = new Date();
            now = now.setMinutes(now.getMinutes() + 30);
            //Relacionando o token gerado com o usuario que solicitou o reset da senha
            await User.update(user.id,{
                reset_token:token,
                reset_token_expires: now
            })
            //Mandando email pelo mailer, com o token gerado para a recuperação de senha
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@foodfy-admin.com.br',
                subject: 'Recuperação de Senha',
                html: `<h2>Perdeu a sua senha?</h2>
                <p> Eis o link de recuperação: </p>
                <p>
                  <a href="http://localhost:3000/admin/reset-password?token=${token}" target=_blank">
                  Recuperar Senha (30 minutos pro Token Expirar)
                  </a>
                </p>`
            })
            //Caso tudo dê certo, o usuário é informado que o email foi enviado com sucesso.
            return res.render("session/forgot-password",{
                sucess:" E-mail com recuperação de senha enviado com sucesso!"
            })
      } catch (error) {
          //Caso ocorra algum erro inesperado, entaõ o usuário é informado do ocorrido.
          console.error(error);
          return res.render("session/forgot-password",{
              error:"Houve um erro inesperado, tente novamente mais tarde"
          })          
      }
    },
    resetForm(req,res) {
        //Pegando o token passado pela query e renderizando a pagina passando-o
        return res.render("session/reset-password",{
            token: req.query.token
        });
    },
    async reset(req,res) {
        const user = req.user;
        const { password, token } = req.body;

        try {
            //Criando novo Hash de Senha
            const newPassword = await bcrypt.hash(password,8);
    
            //Atualizando o cadastro do usuário
            await User.update(user.id,{
                password: newPassword,
                reset_token: "",
                reset_token_expires: "",
            })
            // Caso tudo dê certo, o usuário é redirecioando para efetuar o seu login
            return res.render("session/login",{
                user: req.body,
                sucess: "Senha atualizada com sucesso. Faça o seu login!"
            })
            
        } catch (error) {
            console.error(error);
            //Caso ocorra algum erro inesperado, o suuário será alertado.
            return res.render("session/password-reset",{
                user:req.body,
                token,
                error: "Erro inesperado, tente novamente mais tarde"
            })
        }

    }
}