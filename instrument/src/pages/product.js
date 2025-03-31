import axios from "axios"
import { API_URL } from "../api/Client"


const token = localStorage.getItem("authToken");

export const getProductById = async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}/getProductByCategry?categoryId=${categoryId}`)
        return response.data.data
    } catch (error) {
        return error.data.message
    }
}

export const getFoxboroProduct = async () => {
    try {
        const response = await axios.get(`${API_URL}/foxboroProduct`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {
        return error.message
    }
}