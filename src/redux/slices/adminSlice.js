import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uri = "http://localhost:1010";

// admin registration
export const adminRegister = createAsyncThunk(
  "admin/register",
  async (admin, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${uri}/api/v7/register`, admin);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// admin login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (admin, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${uri}/api/v7/login`, admin);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  admin: {},
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // registration states
      .addCase(adminRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(adminRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login states
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
