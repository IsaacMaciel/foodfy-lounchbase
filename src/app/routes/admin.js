const express = require('express');
const route = express.Router();

const userController = require('../controllers/userController');
const userValidator = require('../validators/user');



// Rotas que o administrador irá acessar para gerenciar usuários
route.get('/users',userController.list)

route.get('/users/myaccount',userController.formAccount) //Mostrar a lista de usuários cadastrados
route.get('/myaccount',(req,res) => {
    res.redirect('/admin/users/myaccount');
})

route.get('/users/create',userController.formCreate)
route.post('/users',userValidator.post,userController.post) //Cadastrar um usuário
route.get('/users/edit/:id',userController.formEdit) 
route.put('/users',userValidator.put,userController.putUser) // Editar um usuário privilégio usuário
route.put('/usersAdm',userValidator.put,userController.putUserAdm) // Editar um usuário privilégio

route.delete('/users',userValidator.alterUserOnlyAdm,userController.delete) // Deletar um usuário [Somente ADM]


module.exports = route;