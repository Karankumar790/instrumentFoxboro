import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../../api/Client";
import Cookies from 'js-cookie';

export const loginUser = createAsyncThunk(
  'auth/loginUser', 
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${USER_URL}/login`, userData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);

export const otpLogin = createAsyncThunk(
  'auth/otpLogin',
  async ({ otp, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${USER_URL}/verifyLoginOtp`,
        { otp, email },
        { withCredentials: true }
      );
      Cookies.set('authToken', response.data.token, { expires: 7 });
      localStorage.setItem('authToken', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "OTP Verification Failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    message: '',
    token: null,
    step: 'login',
  },
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = '';
      state.step = 'login';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
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
        state.step = 'otp';
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
      })
      .addCase(otpLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.step = 'authenticated';
        state.error = null;
      })
      .addCase(otpLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetAuthState, clearError } = authSlice.actions;
export default authSlice.reducer;