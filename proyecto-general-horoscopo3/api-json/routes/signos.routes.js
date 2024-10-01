const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta de login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Determinar el archivo a leer (user.json o admin.json)
    let userFilePath = '';
    if (username === 'user') {
        userFilePath = path.join(__dirname, '../db/user.json');
    } else if (username === 'admin') {
        userFilePath = path.join(__dirname, '../db/admin.json');
    } else {
        return res.status(404).json({ message: 'User not found' });
    }

    // Leer el archivo de usuario
    fs.readFile(userFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user file' });
        }

        const userData = JSON.parse(data);

        // Verificar la contraseña
        if (userData.password === password) {
            res.status(200).json({ role: username });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

// Ruta para cambiar la contraseña
router.put('/change-password', (req, res) => {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
        return res.status(400).json({ message: 'Username and new password are required' });
    }

    // Determinar qué archivo cargar (user.json o admin.json)
    let userFilePath = '';
    if (username === 'user') {
        userFilePath = path.join(__dirname, '../db/user.json');
    } else if (username === 'admin') {
        userFilePath = path.join(__dirname, '../db/admin.json');
    } else {
        return res.status(404).json({ message: 'User not found' });
    }

    // Leer el archivo JSON correspondiente
    fs.readFile(userFilePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading user file' });
        }

        const userData = JSON.parse(data);
        userData.password = newPassword; // Actualizar la contraseña

        // Guardar los cambios en el archivo JSON
        fs.writeFile(userFilePath, JSON.stringify(userData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving new password' });
            }
            res.status(200).json({ message: 'Password changed successfully' });
        });
    });
});

module.exports = router;
