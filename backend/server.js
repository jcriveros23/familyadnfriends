const express = require('express');
const app = express();
const port = 3005; // Elige un puerto para tu servidor
const authRoutes = require('./routes/authRoutes')
const apiRoutes = require('./routes/apiRoutes')
const cors = require('cors'); // Importa la biblioteca cors


app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
app.get('/',(req,res)=>{
  res.send("Hola mundo");
});
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
