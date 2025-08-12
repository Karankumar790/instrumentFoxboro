import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SER_URL } from "../../api/Client";





export const postEstimate = createAsyncThunk(
    "service/estimate",
    async (formValue, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${SER_URL}/quotation`, formValue);
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error deleting project"
            );
        }
    }
)

export const EstimateSlice = createSlice({
    name: "estimateService",
    initialState: { estService: [] },
    extraReducers: (builder) => {
        builder
            .addCase(postEstimate.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(postEstimate.fulfilled, (state, action) => {
                state.loading = false;
                state.estService.push(action.payload);
                state.error = false;
            })
            .addCase(postEstimate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})