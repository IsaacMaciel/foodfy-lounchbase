
module.exports = {
    index(req,res) {
        return res.render("session/login");
    },
    forgot(req,res) {
        return res.render("session/forgot-password");
    }
}