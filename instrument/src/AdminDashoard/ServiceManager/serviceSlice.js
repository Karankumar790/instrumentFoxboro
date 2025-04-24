import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SER_URL } from "../../api/Client";
import reducer from "../Category/CategorySlice";




export const getEstimate = createAsyncThunk(
    "getEstimate",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${SER_URL}/get-all-quotation`)
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
                state.error = false;
        })
        .addCase(getEstimate.rejected, (state) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default getServiceEstimate.reducer;