import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../../api/Client";



export const register = createAsyncThunk('auth/register',async (userData, {rejectWithValue}) => {
    try {
        const {data} = await axios.post(`${USER_URL}/register`,userData)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "SignUp Failed")
    }
})


const authSignUpSlice = createSlice({
    name:"signUp",
    initialState:{
        user:null,
        loading:false,
        error:null,
        message:'',
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error;
        })
        .addCase(register.fulfilled, (state,action) => {
            state.loading = false;
            
        })
    }
})