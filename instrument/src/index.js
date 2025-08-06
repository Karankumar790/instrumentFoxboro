import axios from 'axios'
import { USER_URL } from './api/Client.js'

console.log("object")


const otpSign = async (otp,token) => {
    try {

        const response = await axios.post(`${USER_URL}/verifySignUpOtp`, { otp }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        console.log(response.data)

        return response.data;
    } catch (error) {
        console.error(error); // Log the full error object for debugging
        console.log("something went wrong!")
        return error.message
    }

}

otpSignUp(otp,token);