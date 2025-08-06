import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/Client";



const token = localStorage.getItem("authToken");

export const addSoftware = createAsyncThunk(
  "software/addSoftware",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/foxboroSoftware`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      })
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding "
      )
    }
  }
)

export const EnquirySoftware = createAsyncThunk(
  "software/EnquirySoftware",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/softwareQuery`, formData
       )
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding "
      )
    }
  }
)

export const getSoftware = createAsyncThunk(
  "software/getSoftware",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/foxboroSoftware`);
      return response?.data?.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching software");
    }
  }
);


export const deleteSoftware = createAsyncThunk(
  "software/deleteSoftware",
  async (softwareId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/foxboroSoftware?softwareId=${softwareId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
      return response.data._id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting category"
      );
    }
  }
)

export const upadateSoftware = createAsyncThunk(
  "software/updateSoftware",
  async ({ softwareId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(`${API_URL}/foxboroSoftware?softwareId=${softwareId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating product"
      );
    }
  }
)

const softwareSlice = createSlice({
  name: "software",
  initialState: { data: [], loading: false, error: null, success: false },
  extraReducers: (builder) => {
    builder
      .addCase(addSoftware.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSoftware.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload.data];
        state.success = true;
      })
      .addCase(addSoftware.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(EnquirySoftware.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EnquirySoftware.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, action.payload.data];
        state.success = true;
      })
      .addCase(EnquirySoftware.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getSoftware.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSoftware.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // payload is already the array we want
        state.success = true;
      })
      .addCase(getSoftware.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteSoftware.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSoftware.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (software) => software._id !== action.payload
        )
      })
      .addCase(deleteSoftware.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(upadateSoftware.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(upadateSoftware.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map(software =>
          software._id === action.payload._id ? action.payload : software
        );
        state.success = true;
      })
      .addCase(upadateSoftware.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
  }
})

export default softwareSlice.reducer;