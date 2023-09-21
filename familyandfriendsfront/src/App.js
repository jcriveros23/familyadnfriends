import React from "react";
import LoginForm from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import Configuracion from "./components/configuracion/configuracion";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Asegúrate de importar 'Routes' en lugar de 'Switch'


function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Routes> 
    </Router>
  );
}


export default App;
