const express = require("express");
const route = express.Router();
const foods = require('./data');



route.get("/",function(req,res){
    return res.render("index",{foods});
});

route.get("/sobre",function(req,res){

    return res.render("sobre");
});

route.get("/receitas",function(req,res){

    return res.render("receitas",{foods});
})


module.exports = route;

