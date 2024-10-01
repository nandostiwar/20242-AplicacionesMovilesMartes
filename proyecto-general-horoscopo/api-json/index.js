const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/signos.routes.js');
const authRoutes = require('./routes/auth.routes.js'); 
const cors = require('cors');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors());

// Rutas
app.use('/v1/auth', router); // Usa la ruta /v1/auth para login y cambio de contraseña

app.listen(4000, () => {
    console.log('listening at port 4000');
});
