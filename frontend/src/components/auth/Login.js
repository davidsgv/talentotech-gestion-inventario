import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hacer la solicitud al backend para el login
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        console.log("Login exitoso:", data);
        // Guardar el token en localStorage
        localStorage.setItem('token', data.token);
        // Redirigir a otra página (ejemplo: dashboard)
        window.location.href = '/dashboard';
      } else {
        console.error("Error en el login:", data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input 
          type="text" 
          name="username" 
          value={values.username} 
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={values.password} 
          onChange={handleChange} 
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
