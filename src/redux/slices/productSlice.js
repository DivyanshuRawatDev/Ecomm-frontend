import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    { searchQuery, sort, order, category, currentPage, itemsPerPage },
    thunkAPI
  ) => {
    const response = await axios.get(BASE_URL + "product/get", {
      params: {
        searchQuery,
        sort,
        order,
        category,
        page: currentPage,
        limit: itemsPerPage,
      },
    });
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: true,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.isError = false;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("Error : " + action.payload);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
