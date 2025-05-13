import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../api/Client";

export const postWork = createAsyncThunk(
  "postWork",
  async (formValue, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (let key in formValue) {
        formData.append(key, formValue[key]);
      }

      const response = await axios.post(
        `${API_URL}/service_partner`,
        formValue,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding ");
    }
  }
);



export const workFoxboro = createSlice({
  name: "foxboro",
  initialState: { initWork: [], loading: false, error: null, success: false },
  extraReducers: (builder) => {
    builder
      // Post Work
      .addCase(postWork.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postWork.fulfilled, (state, action) => {
        state.loading = false;
        state.initWork.push(action.payload);
        state.success = true;
        state.error = false;
      })
      .addCase(postWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default workFoxboro.reducer;
