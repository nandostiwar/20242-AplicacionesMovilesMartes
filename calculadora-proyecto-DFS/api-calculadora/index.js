const express = require('express');
const cors = require('cors'); // Importa cors
const app = express();
const calculatorRoutes = require('./routes/calculadora.routes.js');

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

// Rutas de la calculadora
app.use('/v1/calculadora', calculatorRoutes);

app.listen(3500, () => {
    console.log('Servidor escuchando en el puerto 3500');
});
