const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Cargar usuarios y administradores desde JSON
const userPath = path.join(__dirname, '../db/user.json');
const users = JSON.parse(fs.readFileSync(userPath, 'utf-8'));

const adminPath = path.join(__dirname, '../db/admin.json');
const admins = JSON.parse(fs.readFileSync(adminPath, 'utf-8'));

// Ruta para el login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("recibí user: " + username + " y pass: " + password)

    // Verificar si es un usuario normal
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        return res.status(200).json({ message: 'Login successful', role: user.role });
    }

    // Verificar si es un administrador
    const adminUser = admins.find(admin => admin.username === username && admin.password === password);
    if (adminUser) {
        return res.status(200).json({ message: 'Login successful', role: adminUser.role });
    }

    // Si no se encuentra ni usuario ni administrador
    return res.status(401).json({ message: 'Invalid username or password' });
});

module.exports = router;
