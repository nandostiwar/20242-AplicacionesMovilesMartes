// api/routes/calculatorRoutes.js

const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculadoraControllers.js');

router.post('/ordenarAsc', calculatorController.ordenarAsc);
router.post('/ordenarDesc', calculatorController.ordenarDesc);
router.post('/calcularEcuacion', calculatorController.calcularEcuacion);

module.exports = router;
