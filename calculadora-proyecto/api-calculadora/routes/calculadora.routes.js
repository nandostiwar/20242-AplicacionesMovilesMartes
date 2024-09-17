const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

// Rutas para operaciones matemáticas básicas
router.post('/sumar', calculadoraControllers.sumar);
router.post('/restar', calculadoraControllers.restar);
router.post('/multiplicar', calculadoraControllers.multiplicar);

// Rutas para ordenar variables
router.post('/ordenarAsc', calculadoraControllers.ordenarAsc);
router.post('/ordenarDesc', calculadoraControllers.ordenarDesc);

// Ruta para calcular ecuación
router.post('/calcularEcuacion', calculadoraControllers.calcularEcuacion);

module.exports = router;
