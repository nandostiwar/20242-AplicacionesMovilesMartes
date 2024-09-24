const express = require('express');
const credencialesController = require('./controllers/credenciales.controller.js');
const router = express.Router();

// Ruta para obtener todas las credenciales
router.get('/', credencialesController.getCredenciales);

// Ruta para verificar las credenciales enviadas desde el frontend
router.post('/verificarCredenciales', credencialesController.verificarCredenciales);

module.exports = router;