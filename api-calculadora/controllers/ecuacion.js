const express = require('express');
const bodyParser = require('body-parser');
const math = require('mathjs'); // Para interpretar y evaluar expresiones

const app = express();
const port = 3500;

app.use(bodyParser.json());

// Endpoint para procesar la ecuación
app.post('/v1/calculadora/operar', (req, res) => {
    const { equation, values } = req.body; // equation es el string, values son los valores de A, B, C...

    try {
        // Sustitución de valores de A, B, C, etc.
        const scope = {
            a: parseFloat(values.A),
            b: parseFloat(values.B),
            c: parseFloat(values.C),
            d: parseFloat(values.D),
            e: parseFloat(values.E),
            f: parseFloat(values.F),
        };

        
        const result = math.evaluate(equation, scope);

        
        res.json({ resultado: result });
    } catch (error) {
        console.error('Error al evaluar la ecuación:', error);
        res.status(400).json({ error: 'Error en la ecuación' });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
