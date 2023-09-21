import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Configuracion = () =>{
    const navigate = useNavigate();
    const [form, setForm] = useState({
      luxTime:"",
      fanTime:"",
      
    });
    const handleSubmit = async(e) =>{
        e.preventDefault();
        fetch('http://localhost:3005/api/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensaje: 'Prender led' }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servidor:', data);
      })
      .catch(error => {
        console.error('Error al enviar solicitud:', error);
      });
    }
      
    return(
        <button type="button" onClick={handleSubmit}>Enviar mensaje MQTT</button>
    );
}

export default Configuracion;