import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../api/Client';
import axios from 'axios';

// Add Product
export const addFoxProduct = createAsyncThunk(
    'foxboro/addProduct',
    async (proData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.post(`${API_URL}/foxboroProduct`, proData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            // response.data should contain the newly created product
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error adding Foxboro Product'
            );
        }
    }
);

// Fetch Products
export const fetchFoxboroProduct = createAsyncThunk(
    'foxboro/fetchFoxboroProduct',
    async ({ page = 1, limit = 100 }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(
                `${API_URL}/foxboroProduct?page=${page}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data; // products array
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error fetching products'
            );
        }
    }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
    'foxboro/deleteProduct',
    async (productId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`${API_URL}/foxboroProduct?productId=${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return productId; // return deleted id
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error deleting product'
            );
        }
    }
);

// Update Product
export const updateFoxProduct = createAsyncThunk(
    'foxboro/updateFoxProduct',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put(`${API_URL}/foxboroProduct?productId=${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data; // updated product object
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Error updating product'
            );
        }
    }
);

export const submitAdditionalDetails = createAsyncThunk(
    "foxboro/submitAdditionalDetails",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.post(`${API_URL}/additionaldetails/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error submitting additional details"
            );
        }
    }
);

const initialState = {
    products: [],
    loading: false,
    error: null,
    success: false,
};

const foxboroProductSlice = createSlice({
    name: 'foxboroProduct',
    initialState,
    reducers: {
        resetSuccess(state) {
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchFoxboroProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFoxboroProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchFoxboroProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add Product
            .addCase(addFoxProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFoxProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.unshift(action.payload.data); // because response shape: { data: product }
                state.success = true;
            })
            .addCase(addFoxProduct.rejected, (state, action) => {
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
                    (product) => product._id !== action.payload
                );
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
                state.products = state.products.map((product) =>
                    product._id === action.payload.data._id ? action.payload.data : product
                );
                state.success = true;
            })
            .addCase(updateFoxProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Submit Additional Product Details
            .addCase(submitAdditionalDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitAdditionalDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload.data);
                state.success = true;
            })
            .addCase(submitAdditionalDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetSuccess } = foxboroProductSlice.actions;
export default foxboroProductSlice.reducer;
