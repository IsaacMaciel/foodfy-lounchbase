
function recipePut(req,res,next) {
    req.body.user_id = req.userId;
    let {chef,information,preparation,recipes,title,ingredient} = req.body

        const keys = Object.keys(req.body);
        for( key of keys) {
            if (req.body[key] == "" && key != "removed_files" ) {
                return res.render('administrator/recipes/create',{
                    error:"Favor preencher todos os campos",
                   
                })
            }
        }

        if (req.files.length == 0) return res.render('administrator/recipes/create',{
            error:"Favor, enviar ao menos 1 foto",
            
        })

    next();    
}

module.exports = {
    recipePut
}