const fs = require('fs');
const data = require('../../../assets/data.json');
const Recipes = require('../models/recipe');
const Chefs = require('../models/chefs');



module.exports = {

    index(req,res) {

        Recipes.index((foods)=>{
            return res.render('site/index',{foods})
        })

    },

    list(req,res) {
        Recipes.index((foods)=>{
            return res.render("site/receitas",{foods});
        })
    },
    search(req,res){
        const {filter} = req.query;
        
        if (filter) {
            Recipes.foundBy(filter,(foods)=>{
                return res.render('site/searchRecipe',{foods,filter});
            })
        }

    },

    show(req,res) {
        Chefs.findChefandTotalRecipes((chefs)=>{
            return res.render('site/chefs',{chefs});
        })
    }

 
}