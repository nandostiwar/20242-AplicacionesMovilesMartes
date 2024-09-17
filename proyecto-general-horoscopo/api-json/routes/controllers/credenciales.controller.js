// controllers/credenciales.controller.js

// Simulamos una "base de datos" de usuarios (podrías usar un archivo JSON o una verdadera DB)
const credenciales = require('../../db/credenciales.json');
  
  // Función para obtener todas las credenciales
  const getCredenciales = (req, res) => {
    res.json(credenciales);  // Enviamos las credenciales como respuesta
  };
  
  module.exports = {
    getCredenciales,
  };