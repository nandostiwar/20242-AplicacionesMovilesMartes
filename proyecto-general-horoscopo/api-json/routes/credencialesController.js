const fs = require('fs/promises');
const path = require('path');

const validateCredentials = async (req, res) => {
    const { username, password } = req.body;
    const credencialesPath = path.join(__dirname, '../../db/credenciales.json');
    
    try {
        const data = await fs.readFile(credencialesPath, 'utf-8');
        const users = JSON.parse(data);
        
        const user = users.find(u => u.user === username && u.pass === password);
        
        if (user) {
            res.json({ role: user.role });
        } else {
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al leer las credenciales' });
    }
};


// Función para cambiar la contraseña
const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const credencialesPath = path.join(__dirname, '../../db/credenciales.json');

    try {
        const data = await fs.readFile(credencialesPath, 'utf-8');
        const users = JSON.parse(data);

        const userIndex = users.findIndex(u => u.user === username && u.pass === oldPassword);
        
        if (userIndex !== -1) {
            // Actualiza la contraseña
            users[userIndex].pass = newPassword;

            // Escribe los cambios en el archivo
            await fs.writeFile(credencialesPath, JSON.stringify(users, null, 2), 'utf-8');
            
            res.json({ message: 'Contraseña cambiada con éxito' });
        } else {
            res.status(401).json({ message: 'Usuario o contraseña anterior incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar la contraseña' });
    }
};


module.exports = { validateCredentials, changePassword };
