import React, { useEffect, useState } from 'react';
const Dashboard = () =>{
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [userId, setUserId] = useState(1); // Cambia esto según tu lógica para obtener el ID de usuario
  
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
        <h1>Nombre de usuario: {nombreUsuario}</h1>
      </div>
    );
}

export default Dashboard;