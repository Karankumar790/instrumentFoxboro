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
// const otp = "317903"
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9ydG9uMSIsInBob25lIjoiODk1ODM3NjU5MCIsImVtYWlsIjoiY2x1c3QwMTUxQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoibW9udUAxMjMiLCJhdmF0YXIiOiJodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kczM5dDk5dmEvaW1hZ2UvdXBsb2FkL3YxNzQxNjg2MDA2L3prOGpvaTg4anF6dXV1ZHN2cTFoLmF2aWYiLCJvdHAiOiIzMTc5MDMiLCJpYXQiOjE3NDE2ODYwMDYsImV4cCI6MTc0MTY4NjYwNn0.Jke9ooMrAz4vl7D37laQf937x7wJWGYHUq6iQHHhp9I"

otpSignUp(otp,token);

