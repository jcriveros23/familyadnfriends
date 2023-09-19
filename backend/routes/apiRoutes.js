const express = require('express');
const router = express.Router();
const pool = require("./dbConnect")

// Rutas de la API
router.get('/data', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute('SELECT name FROM users WHERE id=1');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

router.post('/create', async (req, res) => {
  const { data } = req.body; // Reemplaza "data" con los datos que recibas en la solicitud

  try {
    const connection = await pool.getConnection();
    const result = await connection.execute('INSERT INTO tu_tabla (columna) VALUES (?)', [data]);
    connection.release();
    res.json({ mensaje: 'Datos creados exitosamente' });
  } catch (error) {
    console.error('Error al crear datos en la API:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

module.exports = router;