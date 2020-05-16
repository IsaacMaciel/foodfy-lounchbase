
module.exports = {
    index(req,res) {
        return res.render("session/login");
    },
    login(req,res) {
        req.session.userId = req.user.id;
       return res.redirect("/admin/recipes");

    },
    forgot(req,res) {
        return res.render("session/forgot-password");
    },
    reset(req,res) {
        return res.render("session/reset-password");
    }
}