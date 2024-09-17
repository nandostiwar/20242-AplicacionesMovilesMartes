const fs = require('fs');
const path = require('path');  // Asegúrate de importar el módulo 'path'
const {add, subtract, multiply} = require('../operaciones/operaciones.js');
const historialPath = path.join(__dirname, '../historial.json');

function readHistorial() {
    try {
        const data = fs.readFileSync(historialPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { ascendente: [], descendente: [], ecuaciones: [] };
    }
}

// Función para guardar el historial en el archivo JSON
function saveHistorial(historial) {
    fs.writeFileSync(historialPath, JSON.stringify(historial, null, 2));
}



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

    const historial = readHistorial();
    historial.ascendente.push(result);
    saveHistorial(historial);
}

// Ordenar números en forma descendente
function descendente(req, res) {
    const { numbers } = req.body;
    const sortedNumbers = numbers.sort((a, b) => b - a);  // Ordenar descendentemente
    res.json({
        resultado: sortedNumbers
    });

    const historial = readHistorial();
    historial.descendente.push(result);
    saveHistorial(historial);
}

function resolverEcuacion(req, res) {
    const { ecuacion, valores } = req.body;

    // Reemplazar A, B, C, etc. con los valores correspondientes
    const ecuacionConValores = ecuacion
        .replace(/A/g, valores.A)
        .replace(/B/g, valores.B)
        .replace(/C/g, valores.C)
        .replace(/D/g, valores.D)
        .replace(/E/g, valores.E)
        .replace(/F/g, valores.F);

    // Evaluar la ecuación usando 'eval' (con precaución)
    try {
        const resultado = eval(ecuacionConValores);
        res.json({ resultado });
    } catch (error) {
        res.status(400).json({ error: "Ecuación no válida" });
    }

    const historial = readHistorial();
    historial.ecuaciones.push({ tipo: 'Ecuación', ecuacion, resultado });
    saveHistorial(historial);
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    ascendente,
    descendente,
    resolverEcuacion  
};
