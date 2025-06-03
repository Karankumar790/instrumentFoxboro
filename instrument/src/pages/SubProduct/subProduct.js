import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/Client";

export const getProduct = createAsyncThunk(
  "getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/additionaldetails/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating product"
      );
    }
  }
);

export const contactProduct = createAsyncThunk(
  "ContactProduct",
   async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/productQuery`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error submitting contact form"
      );
    }
  }
);

export const getContactProduct = createAsyncThunk(
  "getContactProduct",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${API_URL}/productQuery`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching contact products"
      );
    }
  }
);

export const ProductDetail = createSlice({
  name: "getProData",
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
      .addCase(contactProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(contactProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(contactProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getContactProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getContactProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.getPro = action.payload;
        state.success = true;
      })
      .addCase(getContactProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default ProductDetail.reducer;
