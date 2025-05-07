
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { USER_URL } from "../../api/Client";
import axios from "axios";

// 1. Create async thunk to handle API request
export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_URL}/contact`,formData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. Create slice to manage the state
const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error =false;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactSlice.reducer;