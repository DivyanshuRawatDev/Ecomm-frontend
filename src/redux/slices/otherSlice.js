import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const fetchContactMail = createAsyncThunk(
  "other/contact",
  async (credentials) => {
    try {
      const response = await axios.post(
        BASE_URL + "other/contact",
        credentials
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const otherSlice = createSlice({
  name: "other",
  initialState: {
    isLoading: true,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContactMail.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchContactMail.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(fetchContactMail.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default otherSlice.reducer;
