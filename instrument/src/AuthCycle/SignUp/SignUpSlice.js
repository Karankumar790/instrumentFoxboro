import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../../api/Client";



export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${USER_URL}/register`, userData)
        console.log(data.user, "data for token")
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "SignUp Failed")
    }
})

export const otpSignUp = async (otp, token) => {
    try {
        const response = await axios.post(`${USER_URL}/verifySignUpOtp`, { otp }, { 
            headers: { Authorization: `Bearer ${token}` } 
        });
        
        return response.data;
    } catch (error) {
        return error.message
    }

}


const authSignUpSlice = createSlice({
    name: "signUp",
    initialState: {
        user: null,
        token:null,
        loading: false,
        error: null,
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.token=action.payload.user;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

            })
    }
})

export default authSignUpSlice.reducer;