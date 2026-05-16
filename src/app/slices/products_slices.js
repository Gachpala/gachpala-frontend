import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  cart:
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
  favorites:
    typeof window !== "undefined" && localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [],
};

export const product_Slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    productReducer: (state, action) => {
      state.product = action.payload;
    },
    filterProductReducer: (state, action) => {
      state.product = action.payload;
    },
    cartReducer: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        // If item exists, update quantity
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        // If item doesn't exist, add it
        state.cart.push(action.payload);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.cart));
        }
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeProduct: (state, action) => {
      console.log(action.payload);
    },
    addToFavorites: (state, action) => {
      const existingFavorite = state.favorites.find(
        (item) => String(item.id) === String(action.payload.id),
      );

      if (!existingFavorite) {
        state.favorites.push({
          ...action.payload,
          id: String(action.payload.id),
        });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => String(item.id) !== String(action.payload),
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
  },
});

export const {
  productReducer,
  filterProductReducer,
  cartReducer,
  removeProduct,
  updateCartQuantity,
  removeFromCart,
  addToFavorites,
  removeFromFavorites,
} = product_Slice.actions;

export default product_Slice.reducer;
