const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const usersFile = './data.json';

// Leer usuarios desde un archivo JSON
const readUsers = () => {
    try {
        const data = fs.readFileSync(usersFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error leyendo el archivo de usuarios', err);
        return [];
    }
};

// Guardar usuarios en un archivo JSON
const saveUsers = (users) => {
    try {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
    } catch (err) {
        console.error('Error guardando el archivo de usuarios', err);
    }
};

// Ruta de registro
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const users = readUsers();

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    const newUser = {
        id: users.length + 1,  // Asignamos un ID basado en el tamaño del array
        name,
        email,
        password
    };

    users.push(newUser);
    saveUsers(users);

    res.json({ message: 'Usuario registrado exitosamente.', user: newUser });
});

// Ruta de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios.' });
    }

    const users = readUsers();

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Contraseña incorrecta o usuario no encontrado.' });
    }

    res.json({ message: 'Login exitoso', name: user.name });
});

// Ruta para cambiar la contraseña
app.post('/change-password', (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        return res.status(400).json({ message: 'El correo y la nueva contraseña son obligatorios.' });
    }

    const users = readUsers();

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
        return res.status(400).json({ message: 'Usuario no encontrado.' });
    }

    // Cambiar la contraseña del usuario
    users[userIndex].password = newPassword;
    saveUsers(users); // Guardar los cambios en el archivo JSON

    res.json({ message: 'Contraseña cambiada exitosamente.' });
});

// Servir archivos estáticos desde la carpeta frontend
app.use(express.static(path.join(__dirname, '../Frontend')));

// Cualquier otra ruta debería servir el archivo index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
