const Chef = require('../models/chefs');
const Files = require('../models/Files');

module.exports = {
    async deleteChef(req,res,next) {
        const chefId = req.body.id;

        const recipeChef = await Chef.find(chefId);
        const {total} = recipeChef.rows[0];

        //
        let results = await Chef.find(chefId);
        const chef = results.rows[0];

        results = await Files.find(chef.file_id);
        const file = results.rows[0];
        const FilesEdited = {
            ...results[0],
            src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
        }
    
        if (total > 0) return res.render('administrator/chefs/edit',{
            chef,
            file: FilesEdited,
            error: "O chef não pode ser deletado se há uma receita associada a ele, antes apague a receita"
         });

         next();
    },
    post(req,res,next) {
        const keys = Object.keys(req.body);

        for( key of keys) {
            if (req.body[key] == "") {
                return res.render('administrator/chefs/create',{
                    error:"Favor, preencha todos os campos corretamente."
                })
            }
        }
     
        if (!req.file) return res.render('administrator/chefs/create',{
            error:"Favor, envie sua foto de avatar"
        })

        next();
    }
}