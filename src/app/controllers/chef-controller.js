const chefs = require('../models/chefs');
const Files = require('../models/Files');
const User = require('../models/User');
const RecipeFiles = require('../models/recipe_files');
const Recipes = require('../models/recipe');
const fs = require('fs');


module.exports = {


  async  post(req,res) {
        const keys = Object.keys(req.body);

        for( key of keys) {
            if (req.body[key] == "") {
                return res.send('Favor, preencha todos os campos corretamente.');
            }
        }
     
        if (!req.file) return res.send('Favor, selecione pelo menos uma imagem');

        let results = await Files.create(req.file);
        const fileId = results.rows[0].id;

        results = await chefs.create({...req.body,fileId});
        const chefId = results.rows[0].id;

        res.redirect(`/admin/chefs/edit/${chefId}`);
    },

  async  index(req,res) {

        let results = await chefs.all();
        let chefsFound= results.rows;

         chefsFound = chefsFound.map(chef => ({
            ...chef,
            src:`${req.protocol}://${req.headers.host}${chef.path.replace("public","")}`
        }))
      
        return res.render("administrator/chefs/list",{chefs:chefsFound});

    },

    async show(req,res) {
        let results = await chefs.find(req.params.id);
        const chef = results.rows[0];
        results = await chefs.all();
        
        const filesChef = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }))
        
        results = await chefs.recipesForChef(req.params.id);
        const foods = results.rows;

        async function getImage(recipeId) {
            const results = await RecipeFiles.find(recipeId);
            const files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }))

            return files[0];
        }
        results = await Recipes.index();
        const filesPromise = await results.rows.map(recipe => getImage(recipe.id));
        const filesRecipe = await Promise.all(filesPromise);

     

      

        return res.render("administrator/chefs/show",{chef,foods,filesChef,filesRecipe});
        

          
        
        
        
    },
  async  edit(req,res){
        let results = await chefs.find(req.params.id);
        const chef = results.rows[0];

        if (!chef) return res.send("Chefe não encontrado");

        results = await Files.find(chef.file_id);
        const file = results.rows[0];
        const FilesEdited = {
            ...results[0],
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }

            return res.render('administrator/chefs/edit',{chef,file: FilesEdited});

    },
   async put(req,res){
        const chefId = req.body.id;      
        let results = await chefs.findOneChef(chefId);

  
        await chefs.update(req.body);
        
        const {file_id} = results.rows[0];
        results = await Files.find(file_id);
        const {path} = results.rows[0];

        if (req.file) {
            await Files.update(req.file,file_id);
            fs.unlinkSync(path);
        }
        return res.redirect('/admin/chefs');
        
      
    },
    async delete(req,res) {
        const chefId = req.body.id;

        let results = await chefs.findOneChef(chefId);
        const fileId = results.rows[0].file_id;
        
    
        await chefs.delete(chefId);
        await Files.delete(fileId);
            
        return res.redirect('/admin/chefs');
        
    
        
    }




}
