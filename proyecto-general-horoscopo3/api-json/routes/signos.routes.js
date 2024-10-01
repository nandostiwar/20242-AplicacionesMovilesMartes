// server.js
const express = require('express');
const authRouter = require('./routes/authRouter');
const signoRouter = require('./routes/signoRouter'); // Si ya está implementado

const app = express();
const port = 4000;

app.use(express.json());

app.use('/v1/auth', authRouter);
app.use('/v1/signos', signoRouter); // Para las rutas de signos, si es necesario

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
