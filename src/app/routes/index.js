const express = require('express');
const route = express.Router();

const sessionController = require('../controllers/sessionController');
const sessionValidator = require('../validators/session');


// ROTAS PARA LOGIN
route.get('/admin',sessionController.index);
route.post('/admin/login',sessionValidator.login,sessionController.login); 
route.get('/admin/logout',sessionController.logout);

route.get('/admin/forgot-password',sessionController.forgotForm);
route.post('/admin/forgot-password',sessionValidator.forgot,sessionController.forgot); 

route.get('/admin/reset-password',sessionController.resetForm); 
route.post('/admin/reset-password',sessionValidator.reset,sessionController.reset); 


module.exports = route;