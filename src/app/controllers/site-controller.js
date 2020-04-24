const fs = require('fs');
const data = require('../../../assets/data.json');
const Recipes = require('../models/recipe');



module.exports = {

    index(req,res) {

        let recipe6 = [];
        for (let index in data.recipes) {
            index = Number(index);
            recipe6.push({
                ...data.recipes[index],
            })
    
            if (index == 5) {
                return res.render('site/index',{foods:recipe6})
            }
        }
   

    },

    list(req,res) {
        Recipes.index((foods)=>{
            return res.render("site/receitas",{foods});
        })
    }
}