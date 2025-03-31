import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../api/Client";
import axios from "axios";



const token = localStorage.getItem("authToken"); 
export const addFoxProduct = createAsyncThunk(
    "foxboro/addProduct",
    async ({ proData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/foxboroProduct`, proData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response : ",response)
            return response.data;
        } catch (error) {
            console.error("API Error:", error); // ✅ Log full error response
            return rejectWithValue(
                error.response?.data?.message || "Error adding Foxboro Product"
            );
        }
    }
);


const FoxboroProduct = createSlice({
    name: "foxLineProduct",
    initialState: { foxProduct: [], loading: false, error: null, success: false },
    extraReducers: (builder) => {
        builder
            .addCase(addFoxProduct.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(addFoxProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.foxProduct.push(action.payload.data);
            })
            .addCase(addFoxProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default FoxboroProduct.reducer;