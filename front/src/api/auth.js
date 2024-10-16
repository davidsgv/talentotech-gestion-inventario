import axios from "axios"
import {API_URL} from "./config"

export const loginAPI = async (data)=>{
    const response = await axios.post(`${API_URL}/auth/login`, data, {
        headers:{
            "Content-Type": "application/json",
        }
    });
    return response.data;
}

export const registerAPI = async (data)=>{
    const response = await axios.post(`${API_URL}/auth/register`, data, {
        headers:{
            "Content-Type": "application/json",
        }
    });
    return response.data;
}