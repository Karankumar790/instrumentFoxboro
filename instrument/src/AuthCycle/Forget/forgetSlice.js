import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../../api/Client";

// Step 1: Request OTP
export const forget = createAsyncThunk('auth/forget', async (mailData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${USER_URL}/forgotPassword`, mailData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Forget Password Failed");
    }
});

// Step 2: Reset Password
export const resetPassword = createAsyncThunk('auth/resetPassword', async (passwordData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${USER_URL}/resetPassword`, passwordData);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Password Reset Failed");
    }
});

const authForgetSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        error: null,
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle OTP request
            .addCase(forget.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forget.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(forget.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle Password Reset
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default authForgetSlice.reducer;
