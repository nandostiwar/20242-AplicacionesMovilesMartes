// auth.routes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ruta para iniciar sesión (login)
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const filePath = path.join(__dirname, '../db/user.json');

    // Leer archivo user.json
    if (fs.existsSync(filePath)) {
        const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Buscar al usuario en la lista de usuarios
        const user = users.find(user => user.username === username);

        if (user) {
            // Verificar la contraseña
            if (user.password === password) {
                res.json({ role: user.role });
            } else {
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } else {
        res.status(500).json({ message: 'Error al leer el archivo de usuarios' });
    }
});

// Ruta para cambiar contraseña
router.put('/change-password', (req, res) => {
    const { username, newPassword } = req.body;
    const filePath = path.join(__dirname, '../db/user.json');

    // Leer archivo user.json
    if (fs.existsSync(filePath)) {
        const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Buscar al usuario en la lista de usuarios
        const userIndex = users.findIndex(user => user.username === username);

        if (userIndex !== -1) {
            // Actualizar la contraseña del usuario
            users[userIndex].password = newPassword;

            // Guardar los cambios en el archivo
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
            res.json({ message: 'Contraseña actualizada correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } else {
        res.status(500).json({ message: 'Error al leer el archivo de usuarios' });
    }
});

module.exports = router;
