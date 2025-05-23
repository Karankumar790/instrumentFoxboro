import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../api/Client";



export const getWorkFox = createAsyncThunk(
    "getWorkFox",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/service_partner`)
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            )
        }
    }
)

export const getAuthorize = createAsyncThunk(
    "getAuthorize",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/authorize_partner`)
            return response?.data?.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            )
        }
    }
)

export const deleteWorkFox = createAsyncThunk(
    "deleteWorkFox",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/service_partner?id=${id}`)
            return response.data.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            )
        }
    }
)

export const authorizePartner = createAsyncThunk(
    "authorizePartner",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/authorize_partner/?id=${id}`);
            return response.data.data; // assuming updated partner object
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const searchWorkFox = createAsyncThunk(
    "searchWorkFox",
    async ({ city, state, country }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/filter_authorize_partner?`,
                {
                    params: { city, state, country },
                }
            )
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)



export const managerWorkFox = createSlice({
    name: "managerFoxboro",
    initialState: { workFox: [], authWork: [], loading: false, error: null, success: false },
    extraReducers: (builder) => {
        builder
            .addCase(getWorkFox.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getWorkFox.fulfilled, (state, action) => {
                state.loading = false;
                state.workFox = action.payload;
            })
            .addCase(getWorkFox.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(authorizePartner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authorizePartner.fulfilled, (state, action) => {
                state.loading = false;
                // Update the single partner in the state list
                const index = state.workFox.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.workFox[index] = action.payload;
                }
            })
            .addCase(authorizePartner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAuthorize.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getAuthorize.fulfilled, (state, action) => {
                state.loading = false;
                state.authWork = action.payload;
            })
            .addCase(getAuthorize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteWorkFox.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteWorkFox.fulfilled, (state, action) => {
                state.loading = false;
                state.workFox = state.workFox.filter((prev) =>
                    prev._id !== action.payload);
            })
            .addCase(deleteWorkFox.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(searchWorkFox.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(searchWorkFox.fulfilled, (state, action) => {
                state.authWork = action.payload;
            })
            .addCase(searchWorkFox.rejected, (state, action) => {
                state.error = action.payload;
            });

    }
})

export default managerWorkFox.reducer