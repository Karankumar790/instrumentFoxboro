import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/Client";



const token = localStorage.getItem("authToken");

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/getAllCategories`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching categories"
      );
    }
  }
);


console.log("Stored Token:", token);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/category`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", data);
      return data;
    } catch (error) {
      console.error("API Error:", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Error adding category"
      );
    }
  }
);

// export const deleteCategory = createAsyncThunk(
//   "category/deleteCategory",
//   async (categoryId, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.delete(
//         `${API_URL}/category?categoryId=${categoryId}` // Use query parameter
//       );
//       console.log("Delete API Response:", data);
//       return data.data._id; // Return the deleted category ID
//     } catch (error) {
//       console.error("Delete API Error:", error.response);
//       return rejectWithValue(
//         error.response?.data?.message || "Error deleting category"
//       );
//     }
//   }
// );

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API_URL}/category?categoryId=${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
      );
      return data._id; // Return the deleted category ID
    } catch (error) {
      console.error("Delete API Error:", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Error deleting category"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ updateCategoryId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(`${API_URL}/category?categoryId=${updateCategoryId}`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating product"
      );
    }
  }
)


const categorySlice = createSlice({
  name: "category",
  initialState: { categories: [], loading: false, error: null, success: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload; // ✅ Only keep ONE fulfilled case
      })
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
        state.categories.unshift(action.payload.data);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(deleteCategory.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(deleteCategory.fulfilled, (state, action) => {
      
      //   state.categories = state.categories.filter(
      //     (category) => category._id !== action.payload // Ensure category is removed
      //   );
      
      //   console.log("Updated categories list:", state.categories); // Debug log
      // })     
      // .addCase(deleteCategory.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.map((category) =>
          category._id === action.payload.data._id
            ? action.payload.data
            : category
        );
        state.success = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  },
});

export default categorySlice.reducer;
