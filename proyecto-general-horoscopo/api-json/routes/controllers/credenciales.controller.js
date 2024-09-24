// controllers/credenciales.controller.js

// Simulamos una "base de datos" de usuarios (podrías usar un archivo JSON o una verdadera DB)
const credenciales = require('../../db/credenciales.json');
  
  // Función para obtener todas las credenciales
  const getCredenciales = (req, res) => {
    res.json(credenciales);  // Enviamos las credenciales como respuesta
  };
  
// Función para comparar credenciales
const verificarCredenciales = (req, res) => {
  const { username, password } = req.body;  // Obtenemos los datos del cuerpo de la solicitud
  console.log("ffffffff");
  // Buscar si hay alguna credencial que coincida con los datos enviados desde el frontend
  const usuario = credenciales.find(credencial => 
    credencial.username === username && credencial.password === password
  );

  if (usuario) {
    // Si las credenciales coinciden, devolvemos el usuario y su tipo
    res.json({
      message: "Login successful",
      user: {
        username: usuario.username,
        tipo: usuario.tipo
      }
    });
  } else {
    // Si no coinciden, devolvemos un mensaje de error
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }
};


  module.exports = {
    getCredenciales,
    verificarCredenciales,
  };