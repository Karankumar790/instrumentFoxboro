import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../../api/Client";

const token = localStorage.getItem("authToken")

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${USER_URL}/register`, userData)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "SignUp Failed")
    }
})

export const otpSignUp = createAsyncThunk('auth/otpSignUp', async ({ otp, token }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${USER_URL}/verifySignUpOtp`,
            { otp },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
});


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
            .addCase(otpSignUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(otpSignUp.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message || "OTP verified successfully";
            })
            .addCase(otpSignUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default authSignUpSlice.reducer;