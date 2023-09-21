import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../card/card';

const Dashboard = () =>{
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [userId, setUserId] = useState(1); // Cambia esto según tu lógica para obtener el ID de usuario
    const navigate = useNavigate();

    const handleConfigButton = () =>{
      navigate('/configuracion');
    }
    useEffect(() => {
      // Realiza la solicitud al backend cuando el componente se monta
      fetch('http://localhost:3005/api/data')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener el nombre del usuario');
          }
          return response.json();
        })
        .then((data) => {
          setNombreUsuario(data.nombreUsuario);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [userId]);
  
    return (
      <div className="App">
        <h1>Bienvenido a tu dashboard {nombreUsuario}</h1>
        <Card nombre={"Temperatura"}/>
        <Card nombre={"Humedad"}/>
        <button type='button' onClick={handleConfigButton}>Configurar cultivo</button>
        <button type='button'>Iniciar cultivo</button>
      </div>
    );
}

export default Dashboard;