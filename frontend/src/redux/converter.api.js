import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../components/converter/const/initialState";

const converterSlice = createSlice({
  name: "converterSlice",
  initialState,
  reducers: {
    updateValue: (state, action) => {
      const { key, value } = action.payload;
      state[key].value = value;

      const converterValue =
        value === ""
          ? ""
          : parseFloat(
              (
                (state[key].value * state[key].price) /
                state[key === "from" ? "to" : "from"].price
              ).toFixed(10)
            );

      state[key === "from" ? "to" : "from"].value = converterValue;
    },
    updateCurrency: (state, action) => {
      state[action.payload.key].currency = action.payload.value;
    },
    updatePrice: (state, action) => {
      state[action.payload.key].price = action.payload.value;
    },
    reverseValue: state => {
      const stateFrom = state.from;
      const stateToValue = parseFloat(
        ((stateFrom.value * state.to.price) / stateFrom.price).toFixed(10)
      );

      state.from = { ...state.to, value: stateFrom.value };
      state.to = { ...stateFrom, value: stateToValue };
    }
  }
});

export const { updateValue, updateCurrency, updatePrice, reverseValue } =
  converterSlice.actions;
export const converterReducer = converterSlice.reducer;
