const express = require("express");
const route = express.Router();
const card = require("./data.js");


route.get("/",function(req,res){

    const about = {
        avatar_url:"https://avatars1.githubusercontent.com/u/2254731?s=400&v=4",
        title:"Diego CEO da RocketSeat",
        description:'<p> Instrutor da <a href="https://rocketseat.com.br/" target="_blank">RocketSeat</a></p>',
        links: [
            {name:"Github",url:"https://github.com/"},
            {name:"Instagram",url:"https://www.instagram.com/"},
            {name:"Facebook",url:"https://www.facebook.com/"},
        ]
    };

    return res.render("about",{about});

})

route.get("/portfolio",function(req,res){

    return res.render("portfolio",{ item:card});

})


module.exports = route;