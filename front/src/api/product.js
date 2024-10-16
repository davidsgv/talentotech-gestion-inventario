import axios from "axios"
import {API_URL} from "./config"

export const getProducts = async ()=>{
    const response = await axios.get(`${API_URL}/producto`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGYxN2M3ODg0Zjc1ZmUxZTQ3MjE1OCIsImlhdCI6MTcyOTA4NzUyNCwiZXhwIjoxNzI5MDk4MzI0fQ.77DbDeuQOb1y9MaSIEZRuUWMSvZ7n-chagaSpKIPlTA"
        }
    });
    return response.data;
}

export const deleteProduct = async (id)=>{
    const response = await axios.delete(`${API_URL}/producto/${id}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGYxN2M3ODg0Zjc1ZmUxZTQ3MjE1OCIsImlhdCI6MTcyOTA5MTQ3MiwiZXhwIjoxNzI5MTAyMjcyfQ.vuelque66rAFSKVKEZzSVwUHPJQaTTU1237uuNLNpjw"
        }
    });
    return response.data;
}

export const updateProduct = async (id, product)=>{
    const response = await axios.put(`${API_URL}/producto/${id}`, product, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGYxN2M3ODg0Zjc1ZmUxZTQ3MjE1OCIsImlhdCI6MTcyOTA5MTQ3MiwiZXhwIjoxNzI5MTAyMjcyfQ.vuelque66rAFSKVKEZzSVwUHPJQaTTU1237uuNLNpjw"
        }
    });
    return response.data;
}