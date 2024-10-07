// controllers/credenciales.controller.js

// Simulamos una "base de datos" de usuarios (podrías usar un archivo JSON o una verdadera DB)
const bcrypt = require('bcrypt');
const fs = require('fs'); // Para escribir en el archivo JSON
const path = require('path');
const credenciales = require('../../db/credenciales.json');
const credencialesPath = path.join(__dirname, '../../db/credenciales.json'); // Ruta del archivo JSON
  
  // Función para obtener todas las credenciales
  const getCredenciales = (req, res) => {
    res.json(credenciales);  // Enviamos las credenciales como respuesta
  };
  
// Función para comparar credenciales
const verificarCredenciales = (req, res) => {
  const { username, password } = req.body;  // Obtenemos los datos del cuerpo de la solicitud
  
  console.log("Metodo verificacion");
  console.log("usuario: ", username);
  console.log("contraseña: ",password);
  // Buscar si hay alguna credencial que coincida con los datos enviados desde el frontend
  const usuario = credenciales.find(credencial => 
    credencial.username === username && credencial.password === password
  );
  console.log("res ver us: ",usuario);
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


const editarCredenciales =(req, res) => {
  console.log("Metodo EDITAR");
  const { username } = req.params;  // Obtener el usuario desde los parámetros de la URL
  const { password, newpassword } = req.body;  // Obtener las contraseñas desde el cuerpo de la solicitud

  console.log("usuario: ", username);
  console.log("contraseña: ",password);
  console.log("NUEVA CONTRASE;A: ",   newpassword);
 
     // Verificar si el usuario existe
     const usuarioExistente = credenciales.find(credencial => credencial.username === username && credencial.password ===password);

     if (!usuarioExistente) {
      console.log("Usuario o contraseña incorrectos  ");
      return res.status(404).json({ message: "Usuario o contraseña incorrectos  " });
  }else{

       
    // Actualizar la contraseña del usuario
        usuarioExistente.password = newpassword;

        // Guardar los cambios en el archivo JSON
     fs.writeFileSync(credencialesPath, JSON.stringify(credenciales, null, 2));
     console.log("Contraseña actualizada con éxito");
     
     // Responder con éxito
     res.status(200).json({ message: "Contraseña actualizada con éxito", user: usuarioExistente });
 

  }

    

};

  const crearUsuario = (req, res) => {
    const { username, password, tipo } = req.body;  

     console.log("crear usuario: ",username);
  console.log("crear contrasena: ",password);
  console.log("crear tipo: ",tipo);
     // Verificar si el username ya existe
    const usuarioExistente = credenciales.find(credencial => credencial.username === username);

    if (usuarioExistente) {
      console.log("El usuario ya existe ")
      return res.status(400).json({ message: "El usuario ya existe" });
      
    }
  
    // Crear un nuevo objeto credencial
    const nuevaCredencial = {
      username,
      password,
      tipo
    };

      // Agregar la nueva credencial a la lista de credenciales
    credenciales.push(nuevaCredencial);

    // Guardar los cambios en el archivo JSON
    fs.writeFileSync(credencialesPath, JSON.stringify(credenciales, null, 2));
    console.log("Usuario creado con éxito ")
    res.status(201).json({ message: "Usuario creado con éxito", user: nuevaCredencial });
    
  };

  module.exports = {
    getCredenciales,
    verificarCredenciales,
    editarCredenciales,
    crearUsuario
  };