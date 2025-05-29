import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/Client";



const token = localStorage.getItem("authToken");

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async ({ categoryId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/product?categoryId=${categoryId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error fetching categories"
            );
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/product?productId=${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return {response, productId };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error deleting product"
            );
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async ({ productId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/product?productId=${productId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error updating product");
        }
    }
);


const CategoryProductSlice = createSlice({
    name: "product",
    initialState: { product: [], loading: false, error: null, success: false },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = false;
                state.error = null

            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product.unshift(action.payload.data);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = state.product.filter(
                    (product) => product._id !== action.payload.productId
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = state.product.map((product) =>
                    product._id === action.payload.data._id ? action.payload.data : product
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default CategoryProductSlice.reducer;