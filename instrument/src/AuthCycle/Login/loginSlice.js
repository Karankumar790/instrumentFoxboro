import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../../api/Client";

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${USER_URL}/login`, userData)
        return data
    } catch (error) {
       return rejectWithValue(error.response?.data?.message || "Login Failed")
    }
})

export const otpLogin = async (otp,email) => {
    try {
        const response = await axios.post(`${USER_URL}/verifyLoginOtp`, { otp,email });
        return response.data;
    } catch (error) {
        return error.message
    }

}

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
        message:'',
    },
    reducers:{},
    extraReducers: (builder) => {
    builder 
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = "";
    })
    .addCase(loginUser.fulfilled, (state,action) => {
     state.loading = false;
     state.message = action.payload.message;
     state.error = null;
    })
    .addCase(loginUser.rejected, (state,action) => {
        state.loading=false;
        state.error = action.payload;
        state.message = "";
    })
    }
})

export default authSlice.reducer;