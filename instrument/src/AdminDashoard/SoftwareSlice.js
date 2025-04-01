import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://foxboro-backend-1-ux3d.onrender.com/api/v1/admin/foxboroSoftware";

// Fetch software list
export const getSoftwareList = createAsyncThunk(
  "software/getSoftwareList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add new software
export const addSoftware = createAsyncThunk(
  "software/addSoftware",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update software
export const updateSoftware = createAsyncThunk(
  "software/updateSoftware",
  async ({ softwareId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${softwareId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete software
export const deleteSoftware = createAsyncThunk(
  "software/deleteSoftware",
  async (softwareId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${softwareId}`);
      return softwareId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const softwareSlice = createSlice({
  name: "software",
  initialState: {
    softwareList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch software
      .addCase(getSoftwareList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSoftwareList.fulfilled, (state, action) => {
        state.loading = false;
        state.softwareList = action.payload.data;
      })
      .addCase(getSoftwareList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add software
      .addCase(addSoftware.fulfilled, (state, action) => {
        state.softwareList.push(action.payload.data);
      })
      // Update software
      .addCase(updateSoftware.fulfilled, (state, action) => {
        const index = state.softwareList.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) {
          state.softwareList[index] = action.payload.data;
        }
      })
      // Delete software
      .addCase(deleteSoftware.fulfilled, (state, action) => {
        state.softwareList = state.softwareList.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default softwareSlice.reducer;
