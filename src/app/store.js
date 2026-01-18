import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/app/slices/products_slices";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
