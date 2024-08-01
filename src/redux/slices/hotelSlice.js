import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uri = "http://localhost:2500";

// Create hotel
export const createHotel = createAsyncThunk(
  "hotel/create",
  async ({ hotelName }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${uri}/api/v3/hotels/create`,
        { hotelName },
        {
          headers: {
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

// Update hotel
export const updateHotel = createAsyncThunk(
  "hotel/update",
  async ({ hotelName, id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${uri}/api/v3/hotels/update/${id}`,
        { hotelName },
        {
          headers: {
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

// Update hotel paid
export const updateHotelPaid = createAsyncThunk(
  "hotel/updatePaid",
  async ({ id, totalPaid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${uri}/api/v3/hotels/update/paid/${id}`,
        { totalPaid },
        {
          headers: {
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

// Delete hotel
export const deleteHotel = createAsyncThunk(
  "hotel/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${uri}/api/v3/hotels/delete/${id}`, {
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

// Get hotels
export const getHotels = createAsyncThunk(
  "hotel/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${uri}/api/v3/hotels`, {
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

// Get hotels
export const getDetailHotels = createAsyncThunk(
  "hotel/detail",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${uri}/api/v3/details/hotels/${id}`, {
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
  hotels: [],
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Hotel states
      .addCase(createHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels.hotel.push(action.payload.data);
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Hotel states
      .addCase(updateHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.loading = false;
        const updatedHotel = action.payload.data;
        state.hotels = state.hotels.hotel.map((hotel) =>
          hotel.id === updatedHotel.id ? updatedHotel : hotel
        );
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Hotel Paid states
      .addCase(updateHotelPaid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHotelPaid.fulfilled, (state, action) => {
        state.loading = false;
        const updatedHotel = action.payload.data;
        state.hotels = state.hotels.map((hotel) =>
          hotel.id === updatedHotel.id ? updatedHotel : hotel
        );
      })
      .addCase(updateHotelPaid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Hotel states
      .addCase(deleteHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.loading = false;
        const hotelId = action.payload.data.id;
        state.hotels = state.hotels.hotel.filter(
          (hotel) => hotel.id !== hotelId
        );
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Hotels states
      .addCase(getHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.data;
      })
      .addCase(getHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get detail Hotels states
      .addCase(getDetailHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = [action.payload.data];
      })
      .addCase(getDetailHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hotelSlice.reducer;
