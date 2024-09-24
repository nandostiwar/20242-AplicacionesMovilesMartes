const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth.routes.js'); // Importar las rutas de autenticación

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json()); // Middleware para manejar JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de autenticación
app.use('/v1/auth', authRouter); // Registrar las rutas de autenticación

// Otras rutas de tu aplicación, si las tienes
// app.use('/v1/other-route', otherRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Este es una prueba 