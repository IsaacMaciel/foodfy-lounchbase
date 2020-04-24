const fs = require('fs');
const data = require('../../../assets/data.json');
const Recipes = require('../models/recipe');


exports.show = function (req,res) {
        Recipes.details(req.params.id,(foods)=>{
            return res.render("administrator/recipes/recipe",{food:foods});
        })
        
    
   } 
exports.index = function (req,res) {
    Recipes.index((foods)=>{
        res.render('administrator/index',{foods})
    })
    
}
exports.create = (req,res) => {
   Recipes.selectedChef((chefOptions)=>{
    console.log(`Exibindo o valor do chef: ${chefOptions}`)
    res.render('administrator/recipes/create',{chefOptions});
   })

    

    
}
exports.post = function (req,res) {
    
    const keys = Object.keys(req.body);
    console.log(`Informando o valor de Keys:${keys}`);
    for( key of keys) {
        if (req.body[key] == "") {
            return res.send('Favor, preencha todos os campos corretamente.');
        }
    }

    Recipes.create(req.body,(recipe)=>{
        return res.redirect(`/admin/recipe/${recipe.id}`);
    })
  




   

  
    }
  


exports.edit = function (req,res) {
    Recipes.details(req.params.id,(recipes)=>{
        Recipes.selectedChef((chefOptions=>{
            return res.render("administrator/recipes/edit",{recipes,chefOptions});
        }))
        
    })

    

   

},

exports.put = function (req,res) {
    console.log(`Exibindo o req.body do put: ${req.body}`);
        Recipes.update(req.body,()=>{
            res.redirect('/admin');
        })
    
        
    
        
    

}

exports.delete = function (req,res) {
    Recipes.delete(req.body.id,()=>{
        res.redirect('/admin');
    })
        
            
        

}