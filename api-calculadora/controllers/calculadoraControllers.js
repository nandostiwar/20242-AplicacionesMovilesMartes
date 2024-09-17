const express = require('express');
const router = express.Router();

// Endpoint para operaciones básicas
router.post('/:operacion', (req, res) => {
    const { operacion } = req.params;
    const { number1, number2 } = req.body;

    let resultado;
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    switch (operacion) {
        case 'sumar':
            resultado = num1 + num2;
            break;
        case 'restar':
            resultado = num1 - num2;
            break;
        case 'multiplicar':
            resultado = num1 * num2;
            break;
        default:
            return res.status(400).json({ error: 'Operación no válida' });
    }

    res.json({ resultado });
});
