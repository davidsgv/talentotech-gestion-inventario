import React, { useState } from 'react';
import './AuthForm.css'; // Importar el archivo CSS para los estilos

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    role: '',
    permissions: []
  });

  const [message, setMessage] = useState(''); // Estado para almacenar el mensaje de éxito o error
  const [isError, setIsError] = useState(false); // Estado para indicar si hay un error

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Resetear el mensaje y el estado de error
    setMessage('');
    setIsError(false);

    fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        role: values.role || 'user',  // Rol por defecto "user"
        permissions: values.permissions  // Lista de permisos
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        setMessage("Usuario registrado con éxito");
        localStorage.setItem('token', data.token);  // Guardar el token en localStorage
        window.location.href = '/dashboard';  // Redirigir a otra página (por ejemplo, dashboard)
      } else {
        setIsError(true);
        setMessage(`Error al registrar usuario: ${data.message}`);
      }
    })
    .catch(error => {
      setIsError(true);
      setMessage(`Error al registrar usuario: ${error.message}`);
    });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registro</h2>

        {/* Mostrar mensaje de éxito o error */}
        {message && (
          <div className={`message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

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
        <div className="form-group">
          <label>Role:</label>
          <input 
            type="text" 
            name="role" 
            value={values.role} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
