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

export const otpLogin = createAsyncThunk('auth/otpLogin', async ({ otp, email }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${USER_URL}/verifyLoginOtp`, { otp, email }, {
            withCredentials: true, // ✅ Must be true for cookies
        });

        // ✅ Debugging: Check API response before setting token
        console.log("API Response:", response.data);

        // ✅ Store token
        Cookies.set('authToken', response.data.token, { expires: 7 }); // Expires in 7 days
        localStorage.setItem('authToken', response.data.token);

        // ✅ Debugging: Check if token is stored
        console.log("Stored Token:", localStorage.getItem('authToken'));

        return response.data; // Return the API response
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "OTP Verification Failed");
    }
});


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        message: '',
        token: null, // Add token to the initial state
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = "";
            })
            .addCase(otpLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = "";
            })
            .addCase(otpLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.token = action.payload.token; // Store the token in the state
                state.user = action.payload.user; // Store the user data in the state
                state.error = null;
            })
            .addCase(otpLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = "";
            });
    }
});

export default authSlice.reducer;

// const authSlice = createSlice({
//     name:"auth",
//     initialState:{
//         user:null,
//         loading:false,
//         error:null,
//         message:'',
//     },
//     reducers:{},
//     extraReducers: (builder) => {
//     builder 
//     .addCase(loginUser.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//       state.message = "";
//     })
//     .addCase(loginUser.fulfilled, (state,action) => {
//      state.loading = false;
//      state.message = action.payload.message;
//      state.error = null;
//     })
//     .addCase(loginUser.rejected, (state,action) => {
//         state.loading=false;
//         state.error = action.payload;
//         state.message = "";
//     })
//     }
// })

// export default authSlice.reducer;