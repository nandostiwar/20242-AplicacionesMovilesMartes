const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Para manejar solicitudes JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Ruta para guardar datos en un archivo JSON
app.post('/save-data', (req, res) => {
    const data = req.body;

    // Guardar los datos en el archivo 'data.json'
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).send('Error al guardar los datos');
        }
        res.send('Datos guardados correctamente');
    });
});

// Ruta para obtener los datos del archivo JSON
app.get('/get-data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer los datos:', err);
            return res.status(500).send('Error al leer los datos');
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
