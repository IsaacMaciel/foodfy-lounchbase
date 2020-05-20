const fs = require('fs');
const Recipes = require('../models/recipe');
const Files = require('../models/Files');
const User = require('../models/User');
const RecipeFiles = require('../models/recipe_files');

async function getImage(recipeId,req) {
    const results = await RecipeFiles.find(recipeId);
    const files = results.rows.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))

    return files[0];
}

module.exports = {


   async show(req,res) {
        const recipeId = req.params.id;

        let results = await Recipes.find(recipeId);
        const Recipe = results.rows[0];

        if (!Recipe)  return res.send("Receita não encontrada");

        results = await RecipeFiles.findbyRecipe(recipeId);
        const recipeandFilesPromise = results.rows.map(file => Files.find(file.file_id));
        results = await Promise.all(recipeandFilesPromise);

        

       let files = results.map(result => result.rows[0])
       files = files.map(file => ({
           ...file,
           src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
       }))



        return res.render("administrator/recipes/recipe",{food:Recipe,files});
        
            
        
    }, 
    async index(req,res) {
        //Pelo UserId, verifico se a sessão logada é de administrador
        const id =  req.userId;
        //Buscando quem é o usuário Logado
        const user = await User.findOne({
            where:{id}
        })
        //Verificando se o usuário logado é administrador de sistema
        if (user.is_admin == true) {
            //Se for, então será exibido todas as receitas registradas
            let results = await Recipes.index();
            const recipe = results.rows;
          
            
           
        
            const filesPromise = await results.rows.map(recipe => getImage(recipe.id,req));
            const images = await Promise.all(filesPromise);
            return res.render('administrator/index',{foods:recipe,images})

        }
        //Se não, será mostrado todas as receitas criadas pelo usuário cadastrado

        let results = await Recipes.indexforUserId(id);
        const recipe = results.rows;

        const filesPromise = await results.rows.map(recipe => getImage(recipe.id,req));
        const images = await Promise.all(filesPromise);
        return res.render('administrator/index',{foods:recipe,images})

        

    
        
        
    },
    async create(req,res){
        let results = await Recipes.selectedChef();
        const chefOptions = results.rows;

        return res.render('administrator/recipes/create',{chefOptions})
    

        
    },
   async post(req,res) {

        //Cadastro  na tabela Receita
        let results = await Recipes.create(req.body);
        const recipeId = results.rows[0].id;

        console.log(`Valor de req.files:${req.files}`);

        //Cadastro na tabela  imagens
        const filesPromise = req.files.map(file => Files.create(file));
        results =  await Promise.all(filesPromise);
        
        //Cadastrando na tabela de relacionamento Recipe_Files
        const recipeFiles = results.map(result => result.rows[0]);
        const recipeFilesPromisse = recipeFiles.map(file => RecipeFiles.create(recipeId,file.id));
        results = await Promise.all(recipeFilesPromisse);
        
        return res.redirect(`/admin/recipe/${recipeId}`);
         
        },
    


   async edit(req,res) {
        const recipeId = req.params.id;

        let results = await Recipes.find(recipeId);
        const Recipe = results.rows[0];

        if (!Recipe) return res.send("Receita não encontrada");

        results = await RecipeFiles.findbyRecipe(recipeId);
        const recipeandFilesPromise = results.rows.map(file => Files.find(file.file_id));
        results = await Promise.all(recipeandFilesPromise);

        let files = results.map(result => result.rows[0])
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }));

        results = await Recipes.selectedChef();
        const chefOptions = results.rows;

        return res.render("administrator/recipes/edit",{recipes:Recipe,chefOptions,files})



        

    

    },

    async put(req,res) {

        const recipeId = req.body.id;

        const keys = Object.keys(req.body);
        for( key of keys) {
            if (req.body[key] == "" && key != "removed_files") {
                return res.send('Favor, preencha todos os campos corretamente.');
            }
        }

        if (req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(',');
            const lastIndex = removedFiles.length -1;
            removedFiles.splice(lastIndex, 1); 
            
            const removedFilesPromise = removedFiles.map(file => {
                RecipeFiles.delete(file);
                Files.delete(file);

            })

            await Promise.all(removedFilesPromise);
        }

        if (req.files) {

        //Cadastro na tabela  imagens
        const filesPromise = req.files.map(file => Files.create(file));
        results =  await Promise.all(filesPromise);
        
        //Cadastrando na tabela de relacionamento Recipe_Files
        const recipeFiles = results.map(result => result.rows[0]);
        const recipeFilesPromisse = recipeFiles.map(file => RecipeFiles.create(recipeId,file.id));
        results = await Promise.all(recipeFilesPromisse);
        }


       

            await Recipes.update(req.body);
            return res.redirect('/admin/recipes');
           
        
            
        
            
        

    },

   async delete(req,res) {

        const recipeId = req.body.id;
        let results = await RecipeFiles.findbyRecipe(recipeId);
    
        
        const deleteFileFromLocalStore = results.rows.map(file => {
            Files.delete(file.file_id);
        })
        await Promise.all(deleteFileFromLocalStore);


        await Recipes.delete(recipeId);
        

        return  res.redirect('/admin/recipes');
       
            
                
            

    }

}