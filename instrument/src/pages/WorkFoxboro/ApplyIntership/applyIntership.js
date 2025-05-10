import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, SER_URL } from "../../../api/Client";




export const postIntership = createAsyncThunk(
    "postIntership",
    async (formValue, { rejectWithValue }) => {
        try {

            const formData = new FormData();
            for (let key in formValue) {
                formData.append(key, formValue[key]);
            }

            const response = await axios.post(`${API_URL}/internship_candidate`, formValue,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Error adding "
            )
        }
    }
)

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
            });
    },
});

export default applyIntership.reducer;