const User = require('../models/User');
const {hash } = require('bcryptjs');

module.exports = {
    async list(req,res) {
        const users = await User.all()
        return res.render("administrator/user/list",{users})
    },
    formCreate(req,res) {
        return res.render("administrator/user/create");
    },
    async formAccount(req,res) {
        const id = req.session.userId;
        const user = await User.findOne({
            where:{id}
        }) 
        return res.render("administrator/user/account",{user});
    },
  async  post(req,res) {
        
        // Transformando de string para boolean
        if (req.body.is_admin == "true") req.body.is_admin = true;
        await User.create(req.body);

        res.render("administrator/user/create",{
            sucess: "Usuário Cadastrado com Sucesso!"
        })
      
    },
    async formEdit(req,res) {
        const id = req.params.id;
        const user = await User.findOne({
            where:{id}
        })

        return res.render("administrator/user/edit",{user})
    },
    async putUser(req,res) {
        
            const id = req.session.userId;

        
        const { name, email} = req.body;
        let { password } = req.body;

        if (password == "") {
            await User.update(id,{
                name:name,
                email:email
            })
            return res.render("administrator/user/account",{
                sucess:"Alteração realizada com sucesso",
                user:req.body
            })
        }

        password = await hash(password,8);
        await User.update(id,{
            name:name,
            email:email,
            password:password
        })

        return res.render("administrator/user/account",{
            sucess:"Alteração realizada com sucesso",
            user:req.body
        })

        
    },
    async putUserAdm(req,res) {
        const userId = req.body.id;

        const { name, email} = req.body;
        let { password } = req.body;

        if (password == "") {
            await User.update(userId,{
                name:name,
                email:email
            })
            return res.render("administrator/user/edit",{
                sucess:"Alteração realizada com sucesso",
                user:req.body
            })
        }

        password = await hash(password,8);
        await User.update(userId,{
            name:name,
            email:email,
            password:password
        })

        return res.render("administrator/user/edit",{
            sucess:"Alteração realizada com sucesso",
            user:req.body
        })

    },
    async delete(req,res) {
        const { id, name} = req.body;
        let users = await User.all()
        
        try {
            await User.delete(id);
            let users = await User.all()
            return res.render("administrator/user/list",{
                sucess: `O usuário ${name} foi deletado com sucesso`,
                users
            });     
            
        } catch (error) {
            console.error(error)
            return res.render("administrator/user/list",{
                error: `Houve um erro ao deletar o usuário ${name}`,
                users
            });
            
        }

    }
}