import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

export const addProductToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        BASE_URL + "cart/add",
        {
          productId,
          quantity,
        },
        config
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchCartProduct = createAsyncThunk("cart/get", async () => {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(BASE_URL + "cart/get", config);
    return response?.data?.cart.products;
  } catch (error) {
    console.log(error);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    isLoading: true,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(addProductToCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(fetchCartProduct.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchCartProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCartProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default cartSlice.reducer;
