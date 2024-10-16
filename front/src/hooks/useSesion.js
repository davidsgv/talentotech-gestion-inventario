import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Necesitarás instalar jwt-decode
import { loginAPI, registerAPI } from '../api/auth';

// Función para guardar el token en localStorage
const saveToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Función para obtener el token desde localStorage
export const getToken = () => {
    return localStorage.getItem('authToken');
};

// Función para eliminar el token (por ejemplo, cuando el token expira)
const removeToken = () => {
    localStorage.removeItem('authToken');
};

// Hook personalizado
export default function useSesion() {
    const [token, setToken] = useState(getToken());
    const navigate = useNavigate();

    // Función para verificar si el token es válido y no ha expirado
    const isTokenValid = (token) => {
        if (!token) return false;

        try {
            console.log(token)
            const decoded = jwtDecode(token); // Decodificamos el token JWT
            const currentTime = Date.now() / 1000; // Tiempo actual en segundos
            return decoded.exp > currentTime; // El token es válido si la expiración es mayor al tiempo actual
        } catch (error) {
            console.error('Token inválido', error);
            return false;
        }
    };

    // useEffect para verificar el token al cargar la página
    useEffect(() => {
        const storedToken = getToken();

        const isProtectedRoute = location.pathname.startsWith('/app'); // Verifica si la ruta necesita autenticación

        if (isProtectedRoute && (!storedToken || !isTokenValid(storedToken))) {
            removeToken(); // Remover token si no es válido o no existe
            navigate('/'); // Redirigir al login si estás en una ruta protegida
        } else {
            setToken(storedToken); // Guardamos el token si es válido
        }
    }, [location.pathname, navigate]);

    // Función para iniciar sesión (guardar el token)
    const login = (data) => {
        loginAPI(data).then((data) =>{
            const token = data?.token
            saveToken(token);
            setToken(token);
            navigate('/app');
        }) 
    };

    const register = (data) => {
        registerAPI(data).then((data) =>{
            const token = data?.token
            saveToken(token);
            setToken(token);
            navigate('/app');
        }) 
    };

    // Función para cerrar sesión (eliminar el token)
    const logout = () => {
        removeToken();
        setToken(null);
        navigate('/'); // Redirigir al login
    };

    return {
        token,
        login,
        register,
        logout,
        isLoggedIn: !!token, // Devuelve true si hay un token válido
    };
}
