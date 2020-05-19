function redirectToLogin(req,res,next) {
    if (!req.session.userId) return res.redirect('/admin')
    req.userId = req.session.userId;
    next();
}
// function isAdmin(req,res,next) {
//     if(!req.session.is_admin) return res.redirect('/')
// }

module.exports = {
    redirectToLogin
}