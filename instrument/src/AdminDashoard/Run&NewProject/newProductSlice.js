import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/Client";

// Helper function to get token
const getAuthToken = () => localStorage.getItem("authToken") || '';


export const postNewProduct = createAsyncThunk(
  "newProduct/postNewProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${API_URL}/new-project`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding new product");
    }
  }
);

// Get all new products
export const getNewProduct = createAsyncThunk(
  "newProduct/getNewProduct",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/new-project`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      return response.data.data; // Use the data property from response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching new products");
    }
  }
);

// Update a new product
export const updateNewProduct = createAsyncThunk(
  "newProduct/updateNewProduct",
  async ({ projectId, formData }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `${API_URL}/new-project?projectId=${projectId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      );
      return response.data.data; // Return the updated product
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error updating new product");
    }
  }
);

// Delete a new product
export const deleteNewProduct = createAsyncThunk(
  "newProduct/deleteNewProduct",
  async (projectId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.delete(
        `${API_URL}/new-project?projectId=${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      );
      return projectId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting new product");
    }
  }
);

const initialState = {
  newProducts: [],
  loading: false,
  error: null,
  success: false
};

const NewProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Post New Product
      .addCase(postNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.newProducts.unshift(action.payload); // Add to beginning of array
        state.success = true;
      })
      .addCase(postNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Get New Products
      .addCase(getNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.newProducts = action.payload;
      })
      .addCase(getNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.newProducts.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.newProducts[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Delete Product
      .addCase(deleteNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.newProducts = state.newProducts.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = NewProductSlice.actions;
export default NewProductSlice.reducer;