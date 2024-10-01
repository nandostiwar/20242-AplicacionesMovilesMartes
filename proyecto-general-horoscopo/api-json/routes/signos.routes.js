const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js'); // Asegúrate de que esto sea correcto
const fs = require('fs');
const path = require('path');

// Ruta para obtener todos los signos
router.get('/', signoController.getAllSignos)

// Ruta para obtener un signo específico
.get('/:signo', signoController.getOneSigno)

// Ruta para actualizar un signo
.patch('/:signoEditar', signoController.updateSigno)

// Ruta para iniciar sesión
.post('/login', signoController.loginController)

// Ruta para cambiar la contraseña
.post('/changePassword', signoController.changePasswordController)

// Ruta para crear un nuevo usuario
.post('/createUser', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan datos', success: false });
    }

    // Leer usuarios existentes
    const userFilePath = path.join(__dirname, '../db/user.json');
    console.log('Intentando leer el archivo:', userFilePath);

    try {
        const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
        console.log('Usuarios existentes:', users);

        // Verificar si el usuario ya existe
        if (users.some(user => user.username === username)) {
            return res.status(400).json({ message: 'El usuario ya existe', success: false });
        }

        // Añadir el nuevo usuario
        users.push({ username, password, role: 'user' }); // Agregar rol por defecto
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
        console.log('Nuevo usuario agregado:', { username, password });

        return res.status(201).json({ message: 'Usuario creado exitosamente', success: true });
    } catch (error) {
        console.error('Error al leer o escribir el archivo:', error);
        return res.status(500).json({ message: 'Error en el servidor', success: false });
    }
});

module.exports = router;
