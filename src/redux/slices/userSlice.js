import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";
import axios from "axios";

export const fetchLogin = createAsyncThunk("login", async (credentials) => {
  try {
    console.log(credentials);
    const response = await fetch(BASE_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to log in");
      return;
    }

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", JSON.stringify(data?.token));
    }

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchSignup = createAsyncThunk(
  "auth/signup",
  async (credentials) => {
    console.log(credentials, "signup credentials");
    try {
      const response = await axios.post(`${BASE_URL}auth/signup`, credentials);

      const data = response.data;
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }
);

export const fetchLogout = createAsyncThunk("auth/logout", async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(BASE_URL + "auth/logout", config);
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    localStorage.removeItem("token");
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(fetchSignup.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(fetchSignup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
      state.isSuccess = true;
    });
    builder.addCase(fetchSignup.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    });

    builder.addCase(fetchLogout.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    });
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.user = [];
    });
    builder.addCase(fetchLogout.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.user = [];
    });
  },
});

export default userSlice.reducer;
