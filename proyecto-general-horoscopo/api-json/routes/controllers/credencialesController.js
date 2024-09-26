const fs = require('fs/promises');
const path = require('path');

const validateCredentials = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Lee las credenciales de los archivos correspondientes
        const userData = await fs.readFile(path.join(__dirname, '../../db/user.json'), 'utf-8');
        const adminData = await fs.readFile(path.join(__dirname, '../../db/admin.json'), 'utf-8');

        const users = JSON.parse(userData);
        const admins = JSON.parse(adminData);

        // Busca en el archivo de usuarios
        const user = users.find(u => u.user === username && u.pass === password);
        if (user) {
            return res.json({ role: 'user' });
        }

        // Busca en el archivo de administradores
        const admin = admins.find(a => a.user === username && a.pass === password);
        if (admin) {
            return res.json({ role: 'admin' });
        }

        // Si no se encontró el usuario o la contraseña es incorrecta
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });

    } catch (error) {
        res.status(500).json({ message: 'Error al leer las credenciales' });
    }
};

const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    
    try {
        // Lee los archivos user.json y admin.json
        const userPath = path.join(__dirname, '../../db/user.json');
        const adminPath = path.join(__dirname, '../../db/admin.json');
        
        const userData = await fs.readFile(userPath, 'utf-8');
        const adminData = await fs.readFile(adminPath, 'utf-8');
        
        const users = JSON.parse(userData);
        const admins = JSON.parse(adminData);

        // Buscar y cambiar la contraseña en el archivo de usuarios
        const userIndex = users.findIndex(u => u.user === username && u.pass === oldPassword);
        if (userIndex !== -1) {
            users[userIndex].pass = newPassword;
            await fs.writeFile(userPath, JSON.stringify(users, null, 2), 'utf-8');
            return res.json({ message: 'Contraseña cambiada con éxito para usuario' });
        }

        // Buscar y cambiar la contraseña en el archivo de administradores
        const adminIndex = admins.findIndex(a => a.user === username && a.pass === oldPassword);
        if (adminIndex !== -1) {
            admins[adminIndex].pass = newPassword;
            await fs.writeFile(adminPath, JSON.stringify(admins, null, 2), 'utf-8');
            return res.json({ message: 'Contraseña cambiada con éxito para administrador' });
        }

        // Si no se encontró el usuario o la contraseña anterior es incorrecta
        return res.status(401).json({ message: 'Usuario o contraseña anterior incorrectos' });
        
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar la contraseña' });
    }
};

const createUser = async (req, res) => {
    const { username, password, role } = req.body;
    
    try {
        // Determina el archivo de destino según el rol
        const filePath = role === 'admin' 
            ? path.join(__dirname, '../../db/admin.json') 
            : path.join(__dirname, '../../db/user.json');
        
        // Lee el archivo JSON correspondiente
        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data);

        // Verifica si el usuario ya existe
        if (users.some(u => u.user === username)) {
            return res.status(400).json({ message: 'El nombre de usuario ya existe' });
        }

        // Agrega el nuevo usuario
        users.push({ user: username, pass: password });
        
        // Guarda el archivo JSON actualizado
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');

        res.status(201).json({ message: `Usuario creado exitosamente como ${role}` });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

module.exports = { validateCredentials, changePassword, createUser };

