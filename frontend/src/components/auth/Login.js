import React, { useState } from 'react';
import './AuthForm.css'

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
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            value={values.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={values.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
