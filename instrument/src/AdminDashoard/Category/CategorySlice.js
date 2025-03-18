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

// export const addCategory = createAsyncThunk('category/addCategory', async (categoryData, { rejectWithValue }) => {
//   try {
//     const { data } = await axios.post(`${API_URL}/category`, categoryData, {
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       }
//     });

//     return data;
//   } catch (error) {
//     return rejectWithValue(error.response?.message || 'Error adding category');
//   }
// });

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      // Get the token from cookies
      const token = Cookies.get("token");
      console.log("token fro cookies", authToken);

      if (!token) {
        return rejectWithValue("Token not found"); // Handle case when token is not available
      }

      const { data } = await axios.post(`${API_URL}/category`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.message || "Error adding category"
      );
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
