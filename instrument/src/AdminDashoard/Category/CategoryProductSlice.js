import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/Client";



const token = localStorage.getItem("authToken");

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async ({ categoryId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/product?categoryId=${categoryId}`,formData,{
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


const CategoryProductSlice = createSlice({
    name: "product",
    initialState: { product: [], loading: false, error: null, success: false },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = false;
                state.error = null

            })
            .addCase(addProduct.fulfilled, (state,action) => {
                state.loading = false;
                state.product.push(action.payload.data);
            })
            .addCase(addProduct.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default CategoryProductSlice.reducer;