import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../const/initialState";

const converterSlice = createSlice({
  name: "converterSlice",
  initialState,
  reducers: {
    updateValue: (state, action) => {
      const { key, value } = action.payload;
      state[key].value = value;
      state[key === "from" ? "to" : "from"].value = (
        (state[key].value * state[key].price) /
        state[key === "from" ? "to" : "from"].price
      ).toFixed(5);
    },
    updateCurrency: (state, action) => {
      state[action.payload.key].currency = action.payload.value;
    },
    updatePrice: (state, action) => {
      state[action.payload.key].price = action.payload.value;
    }
  }
});

export const { updateValue, updateCurrency, updatePrice } =
  converterSlice.actions;
export const converterReducer = converterSlice.reducer;
