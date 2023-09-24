import { configureStore } from "@reduxjs/toolkit";
import { coinApi } from "./coinApi";
import { converterReducer } from "../components/converter/slice/converter.api";

export const store = configureStore({
  reducer: {
    [coinApi.reducerPath]: coinApi.reducer,
    converter: converterReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(coinApi.middleware)
});
