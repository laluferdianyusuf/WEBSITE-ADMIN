import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uri = "http://localhost:2500";

// Admin registration
export const adminRegister = createAsyncThunk(
  "admin/register",
  async (admin, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${uri}/api/v1/user/register`, admin);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Admin login
export const adminLogin = createAsyncThunk(
  "admin/login",
  async (admin, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${uri}/api/v1/user/login`, admin);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get current user
export const currentUser = createAsyncThunk(
  "admin/current",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${uri}/api/v1/user/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      state.admin = {};
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration states
      .addCase(adminRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data;
      })
      .addCase(adminRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login states
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data.user;
        state.token = action.payload.data.user;
        localStorage.setItem("token", action.payload.data.user);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Current user states
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
