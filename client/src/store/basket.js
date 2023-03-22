import { createSlice } from "@reduxjs/toolkit";
import { client } from "../utils/client";

const initialState = {
  basket: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    getUserBasket: (state, action) => {
      state.basket = action.payload;
    },
    logOutBasket: (state) => {
      state.basket = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUserBasket, logOutBasket } = basketSlice.actions;

export default basketSlice.reducer;
