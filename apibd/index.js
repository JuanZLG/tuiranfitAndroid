const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: 'monitoc10',
  database: 'tuiranfit',
});

app.use(cors());
app.use(bodyParser.json());

app.get('/productos', (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error al consultar la base de datos');
    } else {
      res.json(results);
    }
  });
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Error al consultar la base de datos');
      } else {
        res.json(results);
      }
    });
  });

const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
    console.log('Recibida solicitud de inicio de sesión');
    const { correo, contra } = req.body;
  
    const query = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';
    db.query(query, [correo, contra], (err, results) => {
      if (err) {
        console.error('Error en la consulta a la base de datos:', err);
        return res.status(500).send('Error al consultar la base de datos.');
      }
  
      if (results.length === 0) {
        return res.status(401).send('Credenciales incorrectas.');
      }
  
      const usuario = { correo, contra };
      const token = jwt.sign(usuario, 'tu_secreto'); // Cambia 'tu_secreto' por una clave segura en producción
  
      res.json({ token });
    });
});


app.listen(port, () => {
  console.log(`Servidor API lanzado en el puerto ${port}`);
});