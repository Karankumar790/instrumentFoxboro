import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../api/Client";



const token = localStorage.getItem("authToken");

export const postIntership = createAsyncThunk(
  "postIntership",
  async (formValue, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (let key in formValue) {
        formData.append(key, formValue[key]);
      }

      const response = await axios.post(
        `${API_URL}/internship_candidate`,
        formValue,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding ");
    }
  }
);

export const getWork = createAsyncThunk(
  "getWork",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/internship_candidate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.internCandidate;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching data"
      );
    }
  }
);

export const deleteWork = createAsyncThunk(
  "deleteWork",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/internship_candidate/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.internCandidate;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching data"
      );
    }
  }
);


export const getWork = createAsyncThunk(
    "getWork",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/internship_candidate`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response?.data?.internCandidate;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error fetching data"
            );
        }
    }
);

export const deleteWork = createAsyncThunk(
    "deleteWork",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${API_URL}/internship_candidate/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response?.data?.internCandidate;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error fetching data"
            );
        }
    }
);

export const applyIntership = createSlice({
    name: "intership",
    initialState: { initWork: [], loading: false, error: null, success: false },
    extraReducers: (builder) => {
        builder
            .addCase(postIntership.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(postIntership.fulfilled, (state, action) => {
                state.loading = false;
                state.initWork.push(action.payload);
                state.success = true;
                state.error = false;
            })
            .addCase(postIntership.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getWork.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWork.fulfilled, (state, action) => {
                state.loading = false;
                state.initWork = action.payload;
                state.error = null;
            })
            .addCase(getWork.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteWork.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteWork.fulfilled, (state, action) => {
                state.loading = false;
                state.initWork = state.initWork.filter(
                    (initWorked) => initWorked._id !== action.payload
                );
                state.success = true;
            })
            .addCase(deleteWork.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default applyIntership.reducer;
