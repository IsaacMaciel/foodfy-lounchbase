const chefs = require('../models/chefs');


module.exports = {


    post(req,res) {
        const keys = Object.keys(req.body);

        for( key of keys) {
            if (req.body[key] == "") {
                return res.send('Favor, preencha todos os campos corretamente.');
            }
        }
        if (req.files.length == 0) return res.send('Favor, envie uma foto');

        chefs.create(req.body,(chefs)=>{
            return res.redirect('/admin/chefs/');
        })
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
    edit(req,res){
        chefs.edit(req.params.id,(chef)=>{
            console.log(chef);
            return res.render('administrator/chefs/edit',{chef});
        })

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
