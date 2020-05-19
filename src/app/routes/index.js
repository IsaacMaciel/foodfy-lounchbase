const express = require('express');
const route = express.Router();

const siteController = require('../controllers/site-controller');

const recipe = require('./recipe');
const admin = require('./admin');
const chef = require('./chef');
const login = require('./login');

route.use('/admin',recipe)
route.use('/admin',login)
route.use('/admin',admin)
route.use('/admin',chef)

//Index Pagina Foodfy

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

module.exports = route;
