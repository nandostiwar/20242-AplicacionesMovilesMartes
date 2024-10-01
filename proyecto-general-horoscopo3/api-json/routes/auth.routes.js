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

// Ruta para crear un nuevo usuario
router.post('/createUser', (req, res) => {
    const { username, password, role } = req.body;

    // Verificar que el rol sea válido
    if (role !== 'user' && role !== 'admin') {
        return res.status(400).json({ message: 'Invalid role' });
    }

    // Verificar que el nombre de usuario no exista
    const existingUser = users.find(user => user.username === username);
    const existingAdmin = admins.find(admin => admin.username === username);

    if (existingUser || existingAdmin) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Crear nuevo usuario
    const newUser = { username, password, role };
    users.push(newUser);

    // Guardar el nuevo usuario en el archivo JSON
    fs.writeFileSync(userPath, JSON.stringify(users, null, 2));

    return res.status(201).json({ message: 'User created successfully' });
});

// Ruta para cambiar la contraseña
router.patch('/changePassword', (req, res) => {
    const { username, newPassword, role } = req.body;

    let userFound = false;

    // Verificar el rol y actualizar la contraseña del usuario
    if (role === 'user') {
        const user = users.find(user => user.username === username);
        if (user) {
            user.password = newPassword;
            userFound = true;
        }
    } else if (role === 'admin') {
        const admin = admins.find(admin => admin.username === username);
        if (admin) {
            admin.password = newPassword;
            userFound = true;
        }
    }

    if (!userFound) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Guardar cambios en el archivo JSON
    if (role === 'user') {
        fs.writeFileSync(userPath, JSON.stringify(users, null, 2));
    } else if (role === 'admin') {
        fs.writeFileSync(adminPath, JSON.stringify(admins, null, 2));
    }

    return res.status(200).json({ message: 'Password updated successfully' });
});

module.exports = router;
