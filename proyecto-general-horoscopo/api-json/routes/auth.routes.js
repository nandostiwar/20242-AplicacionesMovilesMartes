const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta para el login de usuarios
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Leer el archivo user.json
    const userPath = path.join(__dirname, '../db/user.json');
    const userCreds = JSON.parse(fs.readFileSync(userPath, 'utf8'));

    // Leer el archivo admin.json
    const adminPath = path.join(__dirname, '../db/admin.json');
    const adminCreds = JSON.parse(fs.readFileSync(adminPath, 'utf8'));

    // Verifica si el usuario es válido
    let user = null;
    if (username === userCreds.username && password === userCreds.password) {
        user = userCreds;
    } else if (username === adminCreds.username && password === adminCreds.password) {
        user = adminCreds;
    }

    if (user) {
        res.status(200).json({ message: 'Login successful', role: user.role });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;

