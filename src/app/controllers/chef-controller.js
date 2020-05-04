const chefs = require('../models/chefs');
const Files = require('../models/Files');


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

    index(req,res) {

        chefs.all((chefs)=>{
            
            return res.render("administrator/chefs/list",{chefs});
        })
    },

    show(req,res) {
        
        chefs.find(req.params.id,(chef)=>{
            chefs.recipesForChef(req.params.id,(foods=>{
                return res.render("administrator/chefs/show",{chef,foods});
            }))
            
        })

          
        
        
        
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
    put(req,res){
        console.log(req.body);
        chefs.update(req.body,()=>{
            return res.redirect('/admin/chefs');
        })
    },
    delete(req,res) {
        chefs.delete(req.body.id,()=>{
            return res.redirect('/admin/chefs/');
        })
        
    }




}
