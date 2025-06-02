import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/Client";






export const postRunning = createAsyncThunk(
    "project/postRunning",
    async (formValue, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/running-project`, formValue, {
                withCredentials: true,
            })
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error adding "
            )
        }
    }
)

export const getRunning = createAsyncThunk(
    "project/getRunning",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/running-project`)
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error adding "
            )
        }
    }
)

export const updateRunning = createAsyncThunk(
    "project/updateRunning",
    async ({ projectId, formData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${API_URL}/running-project?projectId=${projectId}`,
          formData,
          { withCredentials: true }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Error updating project"
        );
      }
    }
  );

  export const deleteRunning = createAsyncThunk(
    "project/deleteRunning",
    async (projectId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `${API_URL}/running-project?projectId=${projectId}`,
          { withCredentials: true }
        );
        return { projectId, message: response.data.message };
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Error deleting project"
        );
      }
    }
  );
  
  

const RunandNewSlice = createSlice({
    name: 'rnProject',
    initialState: { runningInt:[], loading: false, error: null, },
    extraReducers: (builder) => {
        builder
            .addCase(postRunning.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(postRunning.fulfilled, (state, action) => {
                state.loading = false;
                // state.runningInt = action.payload;
                state.runningInt.unshift(action.payload.data); 
                state.error = false;
            })
            .addCase(postRunning.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getRunning.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getRunning.fulfilled, (state, action) => {
                state.loading = false;
                state.runningInt = action.payload.data;
                state.error = false;
            })
            .addCase(getRunning.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateRunning.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updateRunning.fulfilled, (state, action) => {
                state.loading = false;
                // state.runningInt = action.payload;
                // state.runningInt.push(action.payload.data);
                const updatedProject = action.payload.data;
                const index = state.runningInt.findIndex(project => project._id === updatedProject._id);
            
                if (index !== -1) {
                    state.runningInt[index] = updatedProject;
                } 
                state.error = false;
            })
            .addCase(updateRunning.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteRunning.pending, (state) => {
                state.loading = true;
                state.error = false;
              })
              .addCase(deleteRunning.fulfilled, (state, action) => {
                state.loading = false;
                state.runningInt = state.runningInt.filter(
                  (project) => project._id !== action.payload.projectId
                );
                state.error = false;
              })
              .addCase(deleteRunning.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              });
              

    }
})

export default RunandNewSlice.reducer;