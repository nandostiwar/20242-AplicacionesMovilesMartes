// routes/credenciales.routes.js
const express = require('express');
const { getCredenciales } = require('./controllers/credenciales.controller.js');

const router = express.Router();

// Definimos la ruta GET para obtener las credenciales
router.get('/', getCredenciales);

module.exports = router;