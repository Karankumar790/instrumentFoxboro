import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../api/Client";
import axios from "axios";

const token = localStorage.getItem("authToken");

// Add Product
export const addFoxProduct = createAsyncThunk(
    "foxboro/addProduct",
    async ({ proData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/foxboroProduct`, proData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error adding Foxboro Product"
            );
        }
    }
);

// Fetch Products
export const fetchFoxboroProduct = createAsyncThunk(
    "foxboro/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/foxboroProduct`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error fetching products");
        }
    }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
    "foxboro/deleteProduct",
    async (productId, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/foxboroProduct/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return productId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error deleting product"
            );
        }
    }
);

// Update Product
export const updateFoxProduct = createAsyncThunk(
    "foxboro/updateProduct",
    async ({ productId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/foxboroProduct?productId=${productId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error updating product"
            );
        }
    }
);

const foxboroProductSlice = createSlice({
    name: "foxboroProduct",
    initialState: { 
        products: [], 
        loading: false, 
        error: null, 
        success: false 
    },
    reducers: {
        resetProductState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Add Product
            .addCase(addFoxProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFoxProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.unshift(action.payload.data); // Add new product at beginning
                state.success = true;
            })
            .addCase(addFoxProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch Products
            .addCase(fetchFoxboroProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFoxboroProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.data;
            })
            .addCase(fetchFoxboroProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    product => product._id !== action.payload
                );
                state.success = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update Product
            .addCase(updateFoxProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFoxProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map(product => 
                    product._id === action.payload.data._id ? action.payload.data : product
                );
                state.success = true;
            })
            .addCase(updateFoxProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetProductState } = foxboroProductSlice.actions;
export default foxboroProductSlice.reducer;