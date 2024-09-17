const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

// Ruta para ordenar números
router.post('/sort', calculadoraControllers.ordenar);

// Rutas existentes para operaciones aritméticas
router.post('/sumar', calculadoraControllers.sumar);
router.post('/restar', calculadoraControllers.restar);
router.post('/multiplicar', calculadoraControllers.multiplicar);

module.exports = router;
