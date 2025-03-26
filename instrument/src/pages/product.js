import axios from "axios"
import { API_URL } from "../api/Client"




export const getProductById = async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}/getProductByCategry?categoryId=${categoryId}`)
        return response.data.data
    } catch (error) {
        return error.data.message
    }
}