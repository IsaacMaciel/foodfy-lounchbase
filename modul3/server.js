const express = require('express');
const server = express();

const routes = require("./routes.js");

const nunjucks = require('nunjucks');

server.set("view engine","njk");
server.use(express.static('public'));
server.use(routes);

nunjucks.configure("views",{
    express:server,
    autoescape:false,
    noCache:true
});



server.use(function(req, res) {
    res.status(404).render("not-found");
  });


server.listen(1987,function(){

    console.log('Servidor rodando...');
    
});