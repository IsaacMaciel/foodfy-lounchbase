const express = require('express');
const route = express.Router();

const sessionController = require('../controllers/sessionController');
const sessionValidator = require('../validators/session');


// ROTAS PARA LOGIN
route.get('/',sessionController.index);
route.post('/login',sessionValidator.login,sessionController.login); 
route.get('/logout',sessionController.logout);

route.get('/forgot-password',sessionController.forgotForm);
route.post('/forgot-password',sessionValidator.forgot,sessionController.forgot); 

route.get('/reset-password',sessionController.resetForm); 
route.post('/reset-password',sessionValidator.reset,sessionController.reset); 

module.exports = route;