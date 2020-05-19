const express = require('express');
const route = express.Router();

const {redirectToLogin} = require('../middleware/session');
const multer = require('../middleware/multer');
const recipeController = require('../controllers/recipe-controller');



//ROTAS DA PAGINA RECIPES
route.get('/recipes',redirectToLogin,recipeController.index)
route.put('/recipe',redirectToLogin,multer.array('photos',6),recipeController.put); //OK
route.get('/edit',redirectToLogin,function(req,res){
    res.render('administrator/edit');
})
route.get('/recipe/create',redirectToLogin,recipeController.create); //OK
route.post('/recipe/create',redirectToLogin,multer.array('photos',6),recipeController.post);
route.get('/recipe/edit/:id',redirectToLogin,recipeController.edit);
route.get('/recipe/:id',redirectToLogin,recipeController.show);
route.delete('/recipe',redirectToLogin,recipeController.delete); //OK

module.exports = route;