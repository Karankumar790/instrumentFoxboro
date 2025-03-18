import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/Client";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/getAllCategories`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching categories"
      );
    }
  }
);

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async ({ categoryData, token }, { rejectWithValue }) => {
    console.log(token, "token auth");  // Debugging: Check if the token exists

    try {
      const { data } = await axios.post(`${API_URL}/category`, categoryData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });

      console.log("API Response:", data);  // Debugging: Check API response
      return data;
    } catch (error) {
      console.error("API Error:", error.response);  // Debugging: Log error details
      return rejectWithValue(error.response?.data?.message || "Error adding category");
    }
  }
);


const categorySlice = createSlice({
  name: "category",
  initialState: { categories: [], loading: false, error: null, success: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data; // ✅ Extract `data` from API response
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories.push(action.payload.data);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
