import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api/Client";

const token = localStorage.getItem("authToken");

export const postheader = createAsyncThunk(
  "Header/SettingSlice",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/header`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding ");
    }
  }
);

export const getHeader = createAsyncThunk(
  "getHeader/SettingSlice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/header`);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding ");
    }
  }
);

export const updateHeader = createAsyncThunk(
  "update/SettingSlice",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/header`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding ");
    }
  }
);

export const postFooter = createAsyncThunk(
  "footer/postFooter",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/footer`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding ");
    }
  }
);

export const getFooter = createAsyncThunk(
  "footer/getFooter",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/footer`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding ");
    }
  }
);

// export const postBanner = createAsyncThunk(
//   "postBanner",
//   async (images, sliderDelay, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       images.forEach((image) => {
//         formData.append("images", image);
//       });
//       formData.append("sliderDelay", sliderDelay); // 👈 Add time here

//       const response = await axios.post(`${API_URL}/banner`, formData, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Error adding ");
//     }
//   }
// );

export const postBanner = createAsyncThunk(
  "postBanner",
  async ({ images, sliderDelay }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image); // assuming your backend field is `images`
      });
      formData.append("sliderDelay", sliderDelay);

      const response = await axios.post(`${API_URL}/banner`, formData, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding");
    }
  }
);

export const getBanner = createAsyncThunk(
  "getBanner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getAllBanners`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error adding ");
    }
  }
);

// export const deleteBanner = createAsyncThunk(
//     "deleteBanner",
//     async (id, { rejectWithValue }) => {
//         try {
//             const response = await axios.delete(`${API_URL}/deletePhoto/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 }
//             })
//             return response.data
//         } catch (error) {
//             return rejectWithValue(
//                 error.response?.data?.message || "Error adding "
//             )
//         }
//     }
// )

export const deleteBanner = createAsyncThunk(
  "deleteBanner",
  async ({ id, publicIds = [] }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/deletePhoto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { publicIds }, // Send image public IDs in body
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error deleting");
    }
  }
);

const headerSlice = createSlice({
  name: "header",
  initialState: {
    headerInt: [],
    footerInt: [],
    uploadedBanners: [],
    loading: false,
    error: null,
    success: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(postheader.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postheader.fulfilled, (state, action) => {
        state.loading = false;
        state.headerInt = action.payload.data;
        state.error = false;
      })
      .addCase(postheader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.errorMessage = action.payload || "Failed to add header";
      })
      .addCase(getHeader.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.headerInt = action.payload.data;
      })
      .addCase(getHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.errorMessage = action.payload || "Failed to fetch header data";
      })
      .addCase(updateHeader.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.headerInt = action.payload.data;
        state.error = false;
      })
      .addCase(updateHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.errorMessage = action.payload || "Failed to update header";
      })
      .addCase(postFooter.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.footerInt = action.payload.data;
        state.error = false;
      })
      .addCase(postFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data;
        state.errorMessage = action.payload || "Failed to update header";
      })
      .addCase(getFooter.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.footerInt = action.payload.data;
        state.error = false;
      })
      .addCase(getFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postBanner.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postBanner.fulfilled, (state, action) => {
        state.loading = false;
        // state.uploadedBanners.push(action.payload);
        state.error = false;
      })
      .addCase(postBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBanner.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedBanners = action.payload.data;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedBanners = state.uploadedBanners.filter(
          (prev) => prev._id !== action.payload._id
        );
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default headerSlice.reducer;
