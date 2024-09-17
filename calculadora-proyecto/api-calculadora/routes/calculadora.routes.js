const express = require('express');
const router = express.Router();
const {
    sumar,
    restar,
    multiplicar,
    crearEcuacion,
    ordenarAscendente,
    ordenarDescendente
} = require('../controllers/calculadoraControllers'); // Ajusta la ruta si es necesario


router.post('/suma', sumar);


router.post('/resta', restar);


router.post('/multiplicacion', multiplicar);


router.post('/ecuacion', crearEcuacion);


router.post('/ascendente', ordenarAscendente);


router.post('/descendente', ordenarDescendente);

module.exports = router;
