const express = require('express');
const router = express.Router();
const pool = require('./dbConnect');

// Rutas de autenticación
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Ejecuta la consulta SQL para verificar las credenciales del usuario
  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [username, password], (error, results) => {
    if (error) {  
      console.error('Error al autenticar al usuario:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
      return;
    }

    const user = results[0];

    if (!user) {
      // Autenticación fallida
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    } else {
      // Autenticación exitosa
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    }
  });
});

module.exports = router;
