// controllers/credenciales.controller.js

// Simulamos una "base de datos" de usuarios (podrías usar un archivo JSON o una verdadera DB)


const credenciales = require('../../db/credenciales.json');

// Función para comparar los datos enviados desde el JSX (frontend)
const loginUser = (req, res) => {
  const { username, password } = req.body;  // Obtenemos el usuario y la contraseña del cuerpo de la petición

  // Buscamos si hay alguna credencial que coincida con los datos enviados
  const user = credenciales.find(credencial => 
    credencial.username === username && credencial.password === password
  );

  // Si encontramos un usuario, enviamos un mensaje de éxito con los detalles del usuario
  if (user) {
    res.json({
      message: "Login successful",
      user: {
        username: user.username,
        tipo: user.tipo
      }
    });
  } else {
    // Si no coinciden, devolvemos un mensaje de error
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = {
  loginUser
};