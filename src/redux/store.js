import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
});

export default store;
