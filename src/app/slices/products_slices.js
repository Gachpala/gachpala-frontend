import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
};

export const product_Slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    productReducer: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { productReducer } = product_Slice.actions;

export default product_Slice.reducer;
