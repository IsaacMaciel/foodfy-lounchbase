/* Chamando o express */
const express = require('express');
const server = express ();
const routes = require('./app/routes/index');


const methodOverride = require('method-override');
const session = require('../config/session');

/* Chamando e configurando o nosso templa engine Nunjuncks */
const nunjucks = require('nunjucks');
server.set("view engine","njk");
server.use(methodOverride('_method'));
server.use(express.static('public'));
server.use(express.static('images'));
server.use(express.static('js'));

server.use(session);
server.use((req,res,next) => {
    res.locals.session = req.session;
    next();
})
server.use(express.urlencoded({extended:true}));

server.use(routes);

nunjucks.configure("src/app/views",{
    express:server,
    autoescape:false,
    noCache:true
});


/* Configurando a porta do servidor */
server.listen(3000,function(){
    console.log("Foodfy:3000 Rodando");
})