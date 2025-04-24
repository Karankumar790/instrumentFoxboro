import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../../api/Client";



export const getService = createAsyncThunk(
    "getService",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${USER_URL}/contact`)
            return response.data.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error uploading file"
            );
        }
    }
)

export const deleteService = createAsyncThunk(
    "deleteService",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${USER_URL}/contact/${id}`)
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error deleting service"
            );
        }
    }
)


export const serviceSlice = createSlice({
    name: "service",
    initialState: {
        serviceAdm: { getServiceData: [] },
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getService.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getService.fulfilled, (state, action) => {
                state.loading = false;
                state.serviceAdm.getServiceData = action.payload;
                state.error = false;
            })
            .addCase(getService.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(deleteService.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.loading = true;
                state.serviceAdm.getServiceData = state.serviceAdm.getServiceData.filter((service) =>
                service._id !== action.payload)
            })
            .addCase(deleteService.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
    }
})

export default serviceSlice.reducer