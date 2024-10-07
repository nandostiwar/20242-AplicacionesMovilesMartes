const express = require('express');
const credencialesController = require('./controllers/credenciales.controller.js');
const router = express.Router();


// Ruta para obtener todas las credenciales
router.get('/', credencialesController.getCredenciales);

// Ruta para verificar las credenciales enviadas desde el frontend
router.post('/', credencialesController.verificarCredenciales);

router.post('/crear', credencialesController.crearUsuario);

router.patch('/:username', credencialesController.editarCredenciales);

module.exports = router;