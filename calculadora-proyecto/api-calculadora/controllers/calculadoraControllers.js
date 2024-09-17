const {add, subtract, multiply} = require('../operaciones/operaciones.js');


function sumar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = add(number1, number2);
    res.json({
        resultado: result
    });
}

function restar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = subtract(number1, number2);
    res.json({
        resultado: result
    })
}

function multiplicar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = multiply(number1, number2);
    res.json({
        resultado: result
    })
}

function ascendente(req, res) {
    const { numbers } = req.body;
    const sortedNumbers = numbers.sort((a, b) => a - b);  // Ordenar ascendentemente
    res.json({
        resultado: sortedNumbers
    });
}

// Ordenar números en forma descendente
function descendente(req, res) {
    const { numbers } = req.body;
    const sortedNumbers = numbers.sort((a, b) => b - a);  // Ordenar descendentemente
    res.json({
        resultado: sortedNumbers
    });
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    ascendente,
    descendente,
};
