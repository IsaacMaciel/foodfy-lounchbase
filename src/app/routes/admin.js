const express = require('express');
const route = express.Router();

const {onlyAdm} = require('../middleware/session');

const userController = require('../controllers/userController');
const userValidator = require('../validators/user');



// Rotas que o administrador irá acessar para gerenciar usuários
route.get('/users',onlyAdm,userController.list)

route.get('/users/myaccount',userController.formAccount) //Mostrar a lista de usuários cadastrados
route.get('/myaccount',(req,res) => {
    res.redirect('/admin/users/myaccount');
})

route.get('/users/create',onlyAdm,userController.formCreate)
route.post('/users',onlyAdm,userValidator.post,userController.post) //Cadastrar um usuário
route.get('/users/edit/:id',onlyAdm,userController.formEdit) 
route.put('/users',onlyAdm,userValidator.put,userController.putUser) // Editar um usuário privilégio usuário
route.put('/usersAdm',onlyAdm,userValidator.put,userController.putUserAdm) // Editar um usuário privilégio

route.delete('/users',onlyAdm,userValidator.preventDeleteAdm,userController.delete) // Deletar um usuário [Somente ADM]


module.exports = route;