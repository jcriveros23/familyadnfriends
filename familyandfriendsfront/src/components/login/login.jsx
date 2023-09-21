import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function LoginForm() {
  const navigate = useNavigate();
  const [isWrong, setIsWrong]=useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData; // Obtener los valores de username y password del estado

    const response = await fetch('http://localhost:3005/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), // Enviar username y password correctamente
    });
  
    if (response.ok) {
      // La autenticación fue exitosa
      const data = await response.json();
      console.log(data.mensaje);
      setIsWrong(false)
      // Redirige al usuario a la ruta '/dashboard'
      navigate('/dashboard');
      // Realiza cualquier acción adicional, como redirigir al usuario.
    } else {
      // La autenticación falló
      console.error('Inicio de sesión fallido');
      setIsWrong(true)
    }
  };

  return (
    <div className='container'>
      <h2>Iniciar Sesión</h2>
      {isWrong ? <div className='error'>
        <h3>Error en tus credenciales, intenta de nuevo</h3>
      </div>:null}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Nombre de Usuario:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Contraseña:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type='submit'>Iniciar Sesión</button>
        </div>
      </form>
      <div>
        <p>
          ¿No tienes una cuenta? <a href='/registrarse'>Registrarse</a>
        </p>
        <p>
          ¿Olvidó su contraseña?{' '}
          <a href='/olvido-contrasena'>Recuperar Contraseña</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
