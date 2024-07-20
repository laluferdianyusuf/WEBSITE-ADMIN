import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uri = "http://localhost:1010";

// bills registration
export const addBills = createAsyncThunk(
  "bills/add",
  async (bills, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${uri}/api/v1/add/bills`, bills, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// bills list
export const listBills = createAsyncThunk(
  "bills/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${uri}/api/v1/list/bills`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      return response.data.data.bills;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  bills: {},
  token: null,
  loading: false,
  error: null,
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    bills: (state, payload) => {
      state.bills = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // registration bills states
      .addCase(addBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBills.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload;
      })
      .addCase(addBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // list bills states
      .addCase(listBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listBills.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload;
      })
      .addCase(listBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default billsSlice.reducer;
