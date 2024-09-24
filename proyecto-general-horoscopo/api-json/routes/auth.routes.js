// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const usuarios = require('../db/credenciales'); // Importa las credenciales desde credenciales.js

// Ruta para el login de usuarios
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verifica si el usuario y contraseña son correctos
    const user = usuarios.find(user => user.username === username && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Login successful', role: user.role });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;
