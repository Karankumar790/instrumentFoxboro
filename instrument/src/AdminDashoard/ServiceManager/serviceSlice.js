import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SER_URL } from "../../api/Client";




export const getEstimate = createAsyncThunk(
    "getEstimate",
    async ({page, limit}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${SER_URL}/get-all-quotation?page=${page}&limit=${limit}`)
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error adding "
            )
        }
    }
)


export const getServiceEstimate = createSlice({
    name: "serviceManager",
    initialState: {
        quotations: [],
        pagination: {
            total: 9,
            page: 1,
            limit: 4,
            totalPages: 8
        },
        loading: false,
        error: null,
        success: false,
        message: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEstimate.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getEstimate.fulfilled, (state, action) => {
                state.loading = false;
                state.quotations = action.payload.data
                state.pagination = action.payload.pagination;
                state.error = false;
            })
            .addCase(getEstimate.rejected, (state) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default getServiceEstimate.reducer;