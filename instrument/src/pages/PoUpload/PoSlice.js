import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SER_URL } from "../../api/Client";






export const postEmail = createAsyncThunk(
  "search/postEmail",
  async (emailId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SER_URL}/quotation?email=${emailId}`)
      return response.data.quotations
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting project"
      );
    }
  }
)

export const postFileUpload = createAsyncThunk(
  "postFile",
  async ({ quotationId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${SER_URL}/UploadPO?quotationId=${quotationId}`,
        formData, // Send the FormData directly
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error uploading file"
      );
    }
  }
);


export const poUploadSlice = createSlice({
  name: "poUploads",
  initialState: { uploadPo: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(postEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadPo = action.payload;
        state.error = null;
      })
      .addCase(postEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postFileUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postFileUpload.fulfilled, (state, action) => {
        state.loading = false;
        // Update the specific PO in the list if needed
        const updatedPo = action.payload.data;
        state.uploadPo = state.uploadPo.map(po => 
          po._id === updatedPo._id ? updatedPo : po
        );
        state.error = null;
      })
      .addCase(postFileUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default poUploadSlice.reducer;