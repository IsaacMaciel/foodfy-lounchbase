const fs = require('fs');
const Recipes = require('../models/recipe');
const Chefs = require('../models/chefs');
const RecipeFiles = require ('../models/recipe_files');



module.exports = {

   async index(req,res) {
    let results = await Recipes.index();
    const recipe = results.rows;
    
    async function getImage(recipeId) {
        const results = await RecipeFiles.find(recipeId);
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }))

        return files[0];
    }

    const filesPromise = await results.rows.map(recipe => getImage(recipe.id));
    const images = await Promise.all(filesPromise);

      
    return res.render('site/index',{foods:recipe,images})

    },

   async list(req,res) {
    let results = await Recipes.index();
    const recipe = results.rows;
    
    async function getImage(recipeId) {
        const results = await RecipeFiles.find(recipeId);
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }))

        return files[0];
    }

    const filesPromise = await results.rows.map(recipe => getImage(recipe.id));
    const images = await Promise.all(filesPromise);
        
            return res.render("site/receitas",{foods:recipe,images});
        
    },
   async search(req,res){
        const {filter} = req.query;
        let results = await Recipes.foundBy(filter);
        const recipe = results.rows

        
    async function getImage(recipeId) {
        const results = await RecipeFiles.find(recipeId);
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }))

        return files[0];
    }

    const filesPromise = await results.rows.map(recipe => getImage(recipe.id));
    const images = await Promise.all(filesPromise);

        return res.render('site/searchRecipe',{foods:recipe,filter,images});
            
        

    },

   async show(req,res) {
    let results = await Chefs.all();
    let chefsFound= results.rows;

     chefsFound = chefsFound.map(chef => ({
        ...chef,
        src:`${req.protocol}://${req.headers.host}${chef.path.replace("public","")}`
    }));
    
    results = await Chefs.allTotalRecipe();
    const chefsTotal = results.rows;
            return res.render('site/chefs',{chefs:chefsFound,chefsTotal});

    }

 
}