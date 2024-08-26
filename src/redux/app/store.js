import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../slices/adminSlice";
import billReducer from "../slices/billSlice";
import hotelReducer from "../slices/hotelSlice";
import productReducer from "../slices/productSlice";
import orderReducer from "../slices/orderSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    bill: billReducer,
    hotel: hotelReducer,
    product: productReducer,
    order: orderReducer,
  },
});
