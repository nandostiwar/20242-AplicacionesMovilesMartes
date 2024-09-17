// calculadora.routes.js
const express = require('express');
const router = express.Router();

// Función para ordenar números
function sortNumbers(numbers, order) {
    return order === 'asc' ? numbers.sort((a, b) => a - b) : numbers.sort((a, b) => b - a);
}

// Ruta para manejar la ordenación ascendente
router.post('/sort/asc', (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Se esperaba un array de números.' });
    }

    try {
        const sortedNumbers = sortNumbers(numbers, 'asc');
        res.json({ sortedNumbers });
    } catch (error) {
        console.error('Error al ordenar ascendente:', error);
        res.status(500).json({ error: 'Error al ordenar los números' });
    }
});

// Ruta para manejar la ordenación descendente
router.post('/sort/desc', (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Se esperaba un array de números.' });
    }

    try {
        const sortedNumbers = sortNumbers(numbers, 'desc');
        res.json({ sortedNumbers });
    } catch (error) {
        console.error('Error al ordenar descendente:', error);
        res.status(500).json({ error: 'Error al ordenar los números' });
    }
});

module.exports = router;
