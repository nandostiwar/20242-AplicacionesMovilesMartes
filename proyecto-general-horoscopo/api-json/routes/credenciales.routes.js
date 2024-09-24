// routes/credenciales.routes.js
const express = require('express');
const credencialesController = require('./controllers/credenciales.controller.js');
//const { getCredenciales } = require('./controllers/credenciales.controller.js');

const router = express.Router();

// Definimos la ruta GET para obtener las credenciales
router
   
    .patch('/', credencialesController.loginUser)

module.exports = router;