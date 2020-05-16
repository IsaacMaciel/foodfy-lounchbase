const express = require("express");
const route = express.Router();
const multer = require('./app/middleware/multer');

const recipeController = require('./app/controllers/recipe-controller');
const siteController = require('./app/controllers/site-controller');
const chef = require('./app/controllers/chef-controller');
const sessionController = require('./app/controllers/sessionController');

const sessionValidator = require('./app/validators/session');
const {redirectToLogin} = require('./app/middleware/session');

//ROTAS DA PAGINA FOODFY
route.get("/",siteController.index);

route.get("/sobre",function(req,res){

    return res.render("site/sobre");
});

route.get("/receitas",siteController.list);
route.get("/chefs",siteController.show);
route.get("/search",siteController.search);
route.get("/receitas/:index", function (req, res) {
    const recipeIndex = req.params.index;
  
  
        if(recipeIndex > recipes.length - 1 || recipeIndex < 0) {
            return res.render("site/not-found");
        } else {
            return res.render("site/preparo", {food : recipes[recipeIndex] });
        }
    
  })



//ROTAS DA PAGINA RECIPES
route.get('/admin/recipes',redirectToLogin,recipeController.index)
route.put('/admin/recipe',redirectToLogin,multer.array('photos',6),recipeController.put); //OK
route.get('/admin/edit',redirectToLogin,function(req,res){
    res.render('administrator/edit');
})
route.get('/admin/recipe/create',redirectToLogin,recipeController.create); //OK
route.post('/admin/recipe/create',redirectToLogin,multer.array('photos',6),recipeController.post);
route.get('/admin/recipe/edit/:id',redirectToLogin,recipeController.edit);
route.get('/admin/recipe/:id',redirectToLogin,recipeController.show);
route.delete('/admin/recipe',redirectToLogin,recipeController.delete); //OK


// ROTAS PARA LOGIN
route.get('/admin',sessionController.index);
route.post('/admin/login',sessionValidator.login,sessionController.login); 

route.get('/admin/forgot-password',sessionController.forgotForm);
route.post('/admin/forgot-password',sessionValidator.forgot,sessionController.forgot); 

route.get('/admin/reset-password',sessionController.resetForm); 
route.post('/admin/reset-password',sessionValidator.reset,sessionController.reset); 




//ROTAS DA PAGINA CHEF

route.get('/admin/chefs',redirectToLogin,chef.index)

route.get('/admin/chefs/create', (req,res) => {
    res.render('administrator/chefs/create');
})
route.put('/admin/chef',redirectToLogin,multer.single('photochef'),chef.put);
route.post('/admin/chefs/create',redirectToLogin,multer.single('photochef'),chef.post);
route.get('/admin/chefs/edit/:id',redirectToLogin,chef.edit)
route.get('/admin_chef/:id',redirectToLogin,chef.show);
route.delete('/admin/chef',redirectToLogin,chef.delete);













module.exports = route;

