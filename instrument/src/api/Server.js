import axios from "axios"
import { ADMIN_URL } from "./Client"


export const sendOtpLogin = async (formData) => {
    try {
      const response = await axios.post(`${ADMIN_URL}/category`, formData);
      return response.data;
    } catch (error) {
      return catchError(error);
    }
  };