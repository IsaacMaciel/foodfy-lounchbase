function redirectToLogin(req,res,next) {
    if (!req.session.userId) return res.redirect('/admin')
    next();
}

module.exports = {
    redirectToLogin
}