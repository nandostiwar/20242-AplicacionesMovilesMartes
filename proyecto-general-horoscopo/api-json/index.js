const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/signos.routes.js');
const routerCredenciales = require('./routes/credenciales.routes.js');
const cors = require('cors');

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/v1/signos', router);
app.use('/v1/credenciales', routerCredenciales);  // Nueva ruta para credenciales

app.listen(4000, ()=>{
    console.log('listening at port 4000');
})