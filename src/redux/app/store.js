import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slices/adminSlice";
import billReducer from "../slices/billSlice";
// import hotelReducer from "../slices/hotelReducer";
// import productReducer from "../slices/productSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    bills: billReducer,
    // hotel: hotelReducer,
    // product: productReducer,
  },
});
