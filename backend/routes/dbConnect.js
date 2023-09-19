const mysql = require('mysql2');

// Configura la conexión a la base de datos MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'fandf_db',
  password: 'juankmilo2001',
});

// Exporta la piscina de conexiones para usarla en otros módulos
module.exports = pool.promise();
