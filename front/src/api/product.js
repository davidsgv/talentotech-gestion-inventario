import axios from "axios"
import {API_URL} from "./config"
import { getToken } from "../hooks/useSesion";

export const getProducts = async ()=>{
    const response = await axios.get(`${API_URL}/producto`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });
    return response.data;
}

export const deleteProduct = async (id)=>{
    const response = await axios.delete(`${API_URL}/producto/${id}`, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });
    return response.data;
}

export const updateProduct = async (id, product)=>{
    const response = await axios.put(`${API_URL}/producto/${id}`, product, {
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });
    return response.data;
}