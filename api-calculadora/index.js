// index.js

const express = require('express');
const app = express();
const calculatorRoutes = require('./api-calculadora/routes/calculadora.routes.js');

app.use(express.json());

// Rutas de la calculadora
app.use('/v1/calculadora', calculatorRoutes);

app.listen(3500, () => {
    console.log('Servidor escuchando en el puerto 3500');
});
