import axios from "axios";
import { API_URL } from "../api/Client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("authToken");

// Fetch products by category ID (used directly, not in Redux)
export const getProductById = async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}/getProductByCategry?categoryId=${categoryId}`);
        return response.data.data;
    } catch (error) {
        return error?.response?.data?.message || error.message;
    }
};

// Create asyncThunk for foxboro products
export const getFoxboroProduct = createAsyncThunk(
    "foxboroProduct/fetch",
    async ({ page , limit }, thunkAPI) => {
        try {
            const response = await axios.get(`${API_URL}/foxboroProduct?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || error.message);
        }
    }
);

// Redux slice
const foxProduct = createSlice({
    name: "foxboroProduct",
    initialState: {
        productFox: [],
        pagination: {
            total: 9,
            page: 1,
            limit: 4,
            totalPages: 8
        },
        loading: false,
        error: null,
        success: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFoxboroProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFoxboroProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.productFox = action.payload.data;
                state.pagination = action.payload.pagination;
                state.success = true;
            })
            .addCase(getFoxboroProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default foxProduct.reducer;
