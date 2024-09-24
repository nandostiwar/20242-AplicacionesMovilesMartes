const express = require('express');
const router = express.Router();
const fs = require('fs');
const calculadoraControllers = require('../controllers/calculadoraControllers.js');
const path = require('path');
const historialPath = path.join(__dirname, '../historial.json');


// Rutas para operaciones matemáticas básicas
router.post('/sumar', calculadoraControllers.sumar);
router.post('/restar', calculadoraControllers.restar);
router.post('/multiplicar', calculadoraControllers.multiplicar);

// Rutas para ordenar variables
router.post('/ordenarAsc', calculadoraControllers.ordenarAsc);
router.post('/ordenarDesc', calculadoraControllers.ordenarDesc);

// Ruta para calcular ecuación
router.post('/calcularEcuacion', calculadoraControllers.calcularEcuacion);

router.get('/historial', (req, res) => {
    fs.readFile(historialPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el historial' });
        }
        const historial = JSON.parse(data);
        res.json(historial);
    });
});

module.exports = router;
