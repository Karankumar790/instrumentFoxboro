import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../../api/Client";
import Cookies from 'js-cookie';

// export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
//     try {
//         const { data } = await axios.post(`${USER_URL}/login`, userData)
//         return data
//     } catch (error) {
//        return rejectWithValue(error.response?.data?.message || "Login Failed")
//     }
// })

// export const otpLogin = async (otp,email) => {
//     try {
//         const response = await axios.post(`${USER_URL}/verifyLoginOtp`, { otp,email });
//           const authToken = Cookies.get("authToken");
//           console.log(authToken,";;;;;;;;;;;;;;;;;;;;;;;;;;;")
//         return response.data;
//     } catch (error) {
//         return error.message
//     }

// }

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${USER_URL}/login`, userData, {
            withCredentials: true, // 🔥 Allows cookies to be set
        });

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
});

export const otpLogin = async (otp, email) => {
    try {
        const response = await axios.post(`${USER_URL}/verifyLoginOtp`, { otp, email }, {
            withCredentials: true, // ✅ Must be true for cookies
        });

        // ✅ Wait for cookies to be stored before accessing them
        setTimeout(() => {
            const authToken = Cookies.get("authToken");
            console.log(authToken, "🔑 Token from Cookies");
        }, 1000); // ✅ Wait 1 sec for the cookie to appear

        return response.data;
    } catch (error) {
        return error.message;
    }
};


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