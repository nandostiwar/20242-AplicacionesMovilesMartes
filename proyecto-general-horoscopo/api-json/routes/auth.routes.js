const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta para el login de usuarios (mantener existente)
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

// Nueva ruta para cambiar la contraseña
router.put('/change-password', (req, res) => {
    const { username, newPassword } = req.body;

    const userPath = path.join(__dirname, '../db/user.json');
    const adminPath = path.join(__dirname, '../db/admin.json');

    // Leer credenciales
    const userCreds = JSON.parse(fs.readFileSync(userPath, 'utf8'));
    const adminCreds = JSON.parse(fs.readFileSync(adminPath, 'utf8'));

    // Verificar si es usuario o administrador
    if (username === userCreds.username) {
        userCreds.password = newPassword;
        fs.writeFileSync(userPath, JSON.stringify(userCreds, null, 2));
        res.status(200).json({ message: 'Password updated for user' });
    } else if (username === adminCreds.username) {
        adminCreds.password = newPassword;
        fs.writeFileSync(adminPath, JSON.stringify(adminCreds, null, 2));
        res.status(200).json({ message: 'Password updated for admin' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
