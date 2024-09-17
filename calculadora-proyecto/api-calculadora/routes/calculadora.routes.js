const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/sumar', calculadoraControllers.sumar)
    .post('/restar', calculadoraControllers.restar)
    .post('/multiplicar', calculadoraControllers.multiplicar)
    .post('/ascendente', calculadoraControllers.ascendente)
    .post('/descendente', calculadoraControllers.descendente)
    .post('/ecuacion', calculadoraControllers.resolverEcuacion)
    router.get('/historial', (req, res) => {
        try {
            const data = fs.readFileSync(path.join(__dirname, '../historial.json'), 'utf8');
            res.json(JSON.parse(data));
        } catch (err) {
            res.status(500).json({ error: 'Error al leer el historial' });
        }
    });

module.exports = router;