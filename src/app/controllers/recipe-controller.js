const fs = require('fs');
const Recipes = require('../models/recipe');
const Files = require('../models/Files');
const RecipeFiles = require('../models/recipe_files');

module.exports = {
    show(req,res) {
            Recipes.details(req.params.id,(foods)=>{
                return res.render("administrator/recipes/recipe",{food:foods});
            })
            
        
    }, 
    index(req,res) {
        Recipes.index((foods)=>{
            res.render('administrator/index',{foods})
        })
        
    },
    create(req,res){
    Recipes.selectedChef((chefOptions)=>{
        console.log(`Exibindo o valor do chef: ${chefOptions}`)
        res.render('administrator/recipes/create',{chefOptions});
    })

        
    },
   async post(req,res) {
        
        const keys = Object.keys(req.body);
        for( key of keys) {
            if (req.body[key] == "") {
                return res.send('Favor, preencha todos os campos corretamente.');
            }
        }

        if (req.files.length == 0) return res.send('Favor, enviar pelo menos 1 foto');

        //Cadastro  na tabela Receita
        let results = await Recipes.create(req.body);
        const recipe = results.rows[0];

        console.log(`Valor de req.files:${req.files}`);

        //Cadastro na tabela  imagens
        const filesPromise = req.files.map(file => Files.create(...file));
        await Promise.all(filesPromise);

        //Cadastrando na tabela de relacionamento Recipe_Files
        const RecipesFilesPromisse = filesPromise.map(files => RecipeFiles.create({recipe_id: recipe.id,file_id:files.id}))
        await Promise.all(RecipesFilesPromisse);

        return res.redirect(`/admin/recipe/${recipe.id}`);


       
    
        },
    


    edit(req,res) {
        Recipes.details(req.params.id,(recipes)=>{
            Recipes.selectedChef((chefOptions=>{
                return res.render("administrator/recipes/edit",{recipes,chefOptions});
            }))
            
        })

        

    

    },

    put(req,res) {
        console.log(`Exibindo o req.body do put: ${req.body}`);
            Recipes.update(req.body,()=>{
                res.redirect('/admin');
            })
        
            
        
            
        

    },

    delete(req,res) {
        Recipes.delete(req.body.id,()=>{
            res.redirect('/admin');
        })
            
                
            

    }

}