const { add, subtract, multiply } = require('../operaciones/operaciones.js');
const fs = require('fs');
const path = require('path');

// Ruta al archivo de historial
const historialPath = path.join(__dirname, '../historial.json');

// Función para guardar el historial en el archivo JSON
function guardarHistorial(tipoOperacion, numeros) {
    const nuevoRegistro = `${tipoOperacion}: ${numeros.join(' ')}`;

    // Leer el archivo historial.json
    fs.readFile(historialPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de historial:', err);
            return;
        }

        let historial;
        try {
            historial = JSON.parse(data);
        } catch (err) {
            console.error('Error al parsear el archivo JSON:', err);
            historial = { historial: [] };
        }

        // Agregar el nuevo registro al historial
        historial.historial.push(nuevoRegistro);

        // Guardar el historial actualizado
        fs.writeFile(historialPath, JSON.stringify(historial, null, 2), 'utf8', err => {
            if (err) {
                console.error('Error al guardar el archivo de historial:', err);
            }
        });
    });
}


// Sumar
function sumar(req, res) {
    const { number1, number2 } = req.body; // Extraer los números del cuerpo de la solicitud
    const result = add(Number(number1), Number(number2)); // Asegurarse de que sean números
    res.json({
        resultado: result
    });
}

// Restar
function restar(req, res) {
    const { number1, number2 } = req.body;
    const result = subtract(Number(number1), Number(number2));
    res.json({
        resultado: result
    });
}

// Multiplicar
function multiplicar(req, res) {
    const { number1, number2 } = req.body;
    const result = multiply(Number(number1), Number(number2));
    res.json({
        resultado: result
    });
}

// Ordenar ascendente
function ordenarAsc(req, res) {
    const { variables } = req.body; // Variables enviadas desde el frontend
    const sorted = variables.map(Number).sort((a, b) => a - b); // Orden ascendente
    guardarHistorial('Ascendente', sorted);
    res.json({ resultado: sorted });
}

// Ordenar descendente
function ordenarDesc(req, res) {
    const { variables } = req.body; // Variables enviadas desde el frontend
    const sorted = variables.map(Number).sort((a, b) => b - a); // Orden descendente
    guardarHistorial('Descendente', sorted);
    res.json({ resultado: sorted });
}

// Calcular ecuación
function calcularEcuacion(req, res) {
    const { variables, equation } = req.body; // Recibir ecuación y variables

    try {
        let parsedEquation = equation;
        const variableKeys = Object.keys(variables);

        // Reemplazar las variables en la ecuación por sus valores
        variableKeys.forEach(key => {
            const value = variables[key] !== '' ? Number(variables[key]) : 0; // Obtener valor de la variable o 0 si no hay valor
            const regex = new RegExp(`(\\d*)${key}`, 'g');
            parsedEquation = parsedEquation.replace(regex, (match, coef) => {
                coef = coef === '' ? 1 : Number(coef); // Si no hay coeficiente, usar 1
                return coef * value; // Multiplicar el coeficiente por el valor de la variable
            });
        });

        // Evaluar la ecuación resultante
        const result = eval(parsedEquation);

        const variablesString = Object.entries(variables).map(([key, val]) => `${key}: ${val}`).join(', ');
        const equationRecord = `Ecuación (${equation}) con variables ${variablesString}: ${result}`;
        guardarHistorial('Ecuación', [equationRecord]);

        res.json({ resultado: result });
    } catch (error) {
        res.json({ resultado: 'Error en la ecuación' });
    }
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    ordenarAsc,
    ordenarDesc,
    calcularEcuacion
};
