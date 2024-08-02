import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uri = "http://localhost:2500";

// bills registration
export const addBills = createAsyncThunk(
  "bills/create",
  async (billData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${uri}/api/v2/bills/create`,
        billData,
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            "Access-Control-Allow-Credentials": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// bills by id
export const getDetailBill = createAsyncThunk(
  "bills/hotel/id",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${uri}/api/v2/bills/details/${id}`, {
        headers: {
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
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
      const token = localStorage.getItem("token");
      const response = await axios.get(`${uri}/api/v2/bills/detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Credentials": true,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete bill
export const deleteBill = createAsyncThunk(
  "bills/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${uri}/api/v2/bills/delete/${id}`, {
        headers: {
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  bills: {},
  loading: false,
  error: null,
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // registration bills states
      .addCase(addBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload.data;
      })
      .addCase(addBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // list bills by hotel id states
      .addCase(getDetailBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailBill.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload.data;
      })
      .addCase(getDetailBill.rejected, (state, action) => {
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
        state.bills = action.payload.data;
      })
      .addCase(listBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete bill states
      .addCase(deleteBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBill.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.bills.data)) {
          state.bills.data = state.bills.data.filter(
            (bill) => bill.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default billsSlice.reducer;
