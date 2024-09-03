const fs = require('fs');

function comparar(user, password) {
    // Leer y parsear el archivo JSON
    const data = fs.readFileSync('credenciales.json');
    const users = JSON.parse(data).users;

    // Buscar si existe un usuario con el username y password proporcionados
    const user = users.find(user => user.username === inputUsername && user.password === inputPassword);

    if (user) {
        return { success: true, message: 'Login exitoso', role: user.role };
    } else {
        return { success: false, message: 'Nombre de usuario o contraseña incorrectos' };
    }
}

module.exports = {
   comparar
}