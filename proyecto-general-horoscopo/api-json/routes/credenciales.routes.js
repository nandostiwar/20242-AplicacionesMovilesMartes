const express = require('express');
const router = express.Router();
const { validateCredentials, changePassword } = require('./controllers/credencialesController');

router.post('/login', validateCredentials);
router.patch('/change-password', changePassword);  // Nueva ruta para cambiar contraseña

module.exports = router;
