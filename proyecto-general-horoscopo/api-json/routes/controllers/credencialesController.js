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

// Función para cambiar la contraseña permanece igual...

module.exports = { validateCredentials, changePassword };
