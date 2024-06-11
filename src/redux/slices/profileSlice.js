import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const updateProfilePic = createAsyncThunk("profile/Image", async (formData) => {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await axios.post(`${BASE_URL}profile/upload`, formData, config);
    return response?.data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    image: "",
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfilePic.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateProfilePic.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.image = action?.payload;
    });
    builder.addCase(updateProfilePic.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default profileSlice.reducer;
