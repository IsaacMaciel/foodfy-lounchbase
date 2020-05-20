const User = require('../models/User');
const Recipe = require('../models/recipe');

function redirectToLogin(req,res,next) {
    if (!req.session.userId) return res.redirect('/admin')
    req.userId = req.session.userId;
    next();
}

async function deleteRecipeUser(req,res,next) {
    const recipeId = req.params.id;

    const id = req.session.userId;

    const userChecked = await User.findOne({
        where:{id}
    }) 

    if (userChecked.is_admin != true)  {
        let results = await Recipe.find(recipeId);
        if (results.rows[0].user_id != req.session.userId) return res.redirect('/admin/recipes');
        
        next();

    } else {
        
        next();
    }

}

async function onlyAdm(req,res,next) {
    const id = req.session.userId;
    let results = await User.findOne({
        where:{id}
    })
    if (results.is_admin == false) return res.redirect('/admin/users/myaccount');

    next();

}


module.exports = {
    redirectToLogin,
    onlyAdm,
    deleteRecipeUser
    
}