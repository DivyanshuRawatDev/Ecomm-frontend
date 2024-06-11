import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import otherReducer from "./slices/otherSlice";
import profileReducer from "./slices/profileSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const reducers = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
  other: otherReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});

export default store;
