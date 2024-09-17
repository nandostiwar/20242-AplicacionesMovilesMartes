const { add, subtract, multiply } = require('../operaciones/operaciones'); // Ajusta la ruta si es necesario

function sumar(req, res) {
    const { numbers } = req.body;
    if (numbers.length !== 2) {
        return res.status(400).json({ error: 'Se necesitan exactamente 2 números para la suma' });
    }
    const result = add(numbers[0], numbers[1]);
    res.json({ resultado: result });
}


function restar(req, res) {
    const { numbers } = req.body;
    if (numbers.length !== 2) {
        return res.status(400).json({ error: 'Se necesitan exactamente 2 números para la resta' });
    }
    const result = subtract(numbers[0], numbers[1]);
    res.json({ resultado: result });
}


function multiplicar(req, res) {
    const { numbers } = req.body;
    if (numbers.length !== 2) {
        return res.status(400).json({ error: 'Se necesitan exactamente 2 números para la multiplicación' });
    }
    const result = multiply(numbers[0], numbers[1]);
    res.json({ resultado: result });
}


function crearEcuacion(req, res) {
    const { numbers } = req.body;
    const variables = ['a', 'b', 'c', 'd', 'e', 'f']; // Definir las variables
    const ecuacion = numbers.map((num, index) => `${num}${variables[index]}`).join(' + ');
    res.json({ ecuacion });
}


function ordenarAscendente(req, res) {
    const { numbers } = req.body;
    const sortedNumbers = numbers.map(Number).sort((a, b) => a - b);
    res.json({ resultado: sortedNumbers });
    console.log("me llego: " + numbers)
    console.log("envie: " + sortedNumbers)
}


function ordenarDescendente(req, res) {
    const { numbers } = req.body;
    const sortedNumbers = numbers.map(Number).sort((a, b) => b - a);
    res.json({ resultado: sortedNumbers });
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    crearEcuacion,
    ordenarAscendente,
    ordenarDescendente
};
