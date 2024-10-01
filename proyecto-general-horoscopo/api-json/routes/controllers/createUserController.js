// controllers/createUserController.js
const fs = require('fs/promises');
const path = require('path');

const createUserController = async (req, res) => {
    const { username, password, role } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Faltan datos', success: false });
    }

    // Ruta del archivo donde se guardan las credenciales
    const credentialsPath = path.join(__dirname, '../../db/credenciales.json');

    try {
        // Leer las credenciales existentes
        const credentialsData = await fs.readFile(credentialsPath, 'utf-8');
        const credentials = JSON.parse(credentialsData);

        // Verificar si el usuario ya existe
        if (credentials[username]) {
            return res.status(400).json({ message: 'El usuario ya existe', success: false });
        }

        // Agregar el nuevo usuario
        credentials[username] = { password, role };
        await fs.writeFile(credentialsPath, JSON.stringify(credentials, null, 2), 'utf-8');

        res.status(201).json({ message: 'Usuario creado exitosamente', success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

module.exports = createUserController;
