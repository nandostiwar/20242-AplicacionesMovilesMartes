const fs = require('fs');
const path = require('path');

// Función auxiliar para registrar datos en memoria.json
const logToFile = (data) => {
    const filePath = path.join(__dirname, '../memoria.json');
    fs.readFile(filePath, (err, fileData) => {
        let logs = [];
        if (!err && fileData.length) {
            logs = JSON.parse(fileData);
        }
        logs.push(data);
        fs.writeFile(filePath, JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de registro:', err);
            }
        });
    });
};

// Función para ordenar ascendentemente
exports.ordenarAsc = (req, res) => {
    const { variables } = req.body;
    const sortedAsc = variables.map(Number).sort((a, b) => a - b);
    
    // Registrar los datos en memoria.json
    logToFile({
        operation: 'ordenarAsc',
        input: variables,
        result: sortedAsc,
        timestamp: new Date()
    });

    res.json({ resultado: sortedAsc });
};

// Función para ordenar descendentemente
exports.ordenarDesc = (req, res) => {
    const { variables } = req.body;
    const sortedDesc = variables.map(Number).sort((a, b) => b - a);
    
    // Registrar los datos en memoria.json
    logToFile({
        operation: 'ordenarDesc',
        input: variables,
        result: sortedDesc,
        timestamp: new Date()
    });

    res.json({ resultado: sortedDesc });
};

// Función para calcular la ecuación
exports.calcularEcuacion = (req, res) => {
    console.log(req.body); // Para depuración
    const { variables, equation } = req.body;

    if (!variables || !equation) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    // Reemplazar variables en la ecuación
    let ecuacionReemplazada = equation;
    for (const [key, value] of Object.entries(variables)) {
        ecuacionReemplazada = ecuacionReemplazada.replace(new RegExp(key, 'g'), value);
    }

    try {
        // Evaluar la ecuación
        const resultado = eval(ecuacionReemplazada);

        // Registrar los datos en memoria.json
        logToFile({
            operation: 'calcularEcuacion',
            input: { variables, equation },
            result: resultado,
            timestamp: new Date()
        });

        res.json({ resultado });
    } catch (error) {
        res.status(400).json({ error: 'Error al evaluar la ecuación' });
    }
};
