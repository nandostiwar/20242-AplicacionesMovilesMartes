const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
const loginController = require('./controllers/loginController.js');

router
    .get('/', signoController.getAllSignos)
    .get('/:signo', signoController.getOneSigno)
    .patch('/:signoEditar', signoController.updateSigno)
    .post('/login', loginController.loginUser); // Nueva ruta de login

module.exports = router;
