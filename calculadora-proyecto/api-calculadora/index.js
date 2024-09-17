const express = require('express');
const cors = require('cors');
const calculadoraRoutes = require('./routes/calculadora.routes.js'); // Importar las rutas

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Usar las rutas del archivo calculadoraRoutes.js
app.use('/v1/calculadora', calculadoraRoutes);

// Puerto
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
