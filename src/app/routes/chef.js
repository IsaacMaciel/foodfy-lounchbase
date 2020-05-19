const express = require('express');
const route = express.Router();

const {redirectToLogin} = require('../middleware/session');
const multer = require('../middleware/multer');
const chef = require('../controllers/chef-controller');
const chefValidator = require('../validators/chef');



//ROTAS DA PAGINA CHEF
route.get('/chef',redirectToLogin,chef.index)

route.get('/chef/create', (req,res) => {
    res.render('administrator/chefs/create');
})
route.put('/chef',redirectToLogin,multer.single('photochef'),chef.put);
route.post('/chef/create',redirectToLogin,multer.single('photochef'),chef.post);
route.get('/chef/edit/:id',redirectToLogin,chef.edit)
route.get('/chef/:id',redirectToLogin,chef.show);
route.delete('/chef',redirectToLogin,chefValidator.deleteChef,chef.delete);

module.exports = route;