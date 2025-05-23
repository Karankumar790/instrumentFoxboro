import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../api/Client";




export const postHiring = createAsyncThunk(
    "postHiring",
    async (formValue, { rejetWithValue }) => {
        try {

            const formData = new FormData();
            for (let key in formValue) {
                formData.append(key, formValue[key]);
            }

            const response = await axios.post(`${API_URL}/hiring_expert`, formValue,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            return response.data
        } catch (error) {
            return rejetWithValue(
                error.response?.data?.message || "Error adding "
            )
        }
    }
)


export const getHiring = createAsyncThunk(
    "getHiring",
    async (_, { rejetWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get(`${API_URL}/hiring_expert`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data.data
        } catch (error) {
            return rejetWithValue(
                error.response?.data?.message || "Error adding "
            )
        }
    }
)

export const deleteHiring = createAsyncThunk(
    "deleteHiring",
    async (id, { rejetWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.delete(`${API_URL}/hiring_expert/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.data.data
        } catch (error) {
            return rejetWithValue(
                error.response?.data?.message || "Error adding "
            )
        }
    }
)

export const hiringExp = createSlice({
    name: "hiring",
    initialState: { initHiring: [], loading: false, error: null, success: false },
    extraReducers: (builder) => {
        builder
            .addCase(postHiring.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(postHiring.fulfilled, (state, action) => {
                state.loading = false;
                state.initHiring.push(action.payload);
                state.success = true;
                state.error = false;
            })
            .addCase(postHiring.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getHiring.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHiring.fulfilled, (state, action) => {
                state.loading = false;
                state.initHiring = action.payload;
            })
            .addCase(getHiring.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteHiring.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(deleteHiring.fulfilled, (state, action) => {
                state.loading = false;
                state.initHiring = state.initHiring.filter((prev) => prev._id !== action.payload);
                state.error = false;
            })
            .addCase(deleteHiring.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default hiringExp.reducer;