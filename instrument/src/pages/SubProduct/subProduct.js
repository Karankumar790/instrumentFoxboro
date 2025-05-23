import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/Client";



export const getProduct = createAsyncThunk(
    "getProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/additionaldetails/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error updating product"
            );
        }

    }
)

export const ProductDetail = createSlice({
    name: 'getProData',
    initialState: { getPro: [], loading: false, error: null, success: false },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.getPro = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

