const express = require("express");
const route = express.Router();
const multer = require('./app/middleware/multer');

const controller = require('./app/controllers/recipe-controller');
const siteController = require('./app/controllers/site-controller');
const chef = require('./app/controllers/chef-controller');


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

 route.get('/admin',controller.index) //OK
route.put('/admin/recipe',controller.put); //OK
route.get('/admin/edit',function(req,res){
    res.render('administrator/edit');
})
route.get('/admin/recipe/create',controller.create); //OK
route.post('/admin/recipe/create',multer.array('photos',6),controller.post);
route.get('/admin/recipe/edit/:id',controller.edit);
route.get('/admin/recipe/:id',controller.show);
route.delete('/admin/recipe',controller.delete); //OK



//ROTAS DA PAGINA CHEF

route.get('/admin_chefs',chef.index)

route.get('/admin/chefs/create', (req,res) => {
    res.render('administrator/chefs/create');
})
route.put('/admin/chef',chef.put);
route.post('/admin/chefs/create',multer.single('photochef'),chef.post);
route.get('/admin/chefs/edit/:id',chef.edit)
route.get('/admin_chef/:id',chef.show);
route.delete('/admin/chef',chef.delete);













module.exports = route;

