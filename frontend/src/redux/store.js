import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { coinApi } from "./coinApi";
import { newsReducer } from "./news/news";
import { converterReducer } from "./converter.api";
import { newsApi } from "./news/newsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./authApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [coinApi.reducerPath],
  whitelist: ["news"]
};

const rootReducer = combineReducers({
  [coinApi.reducerPath]: coinApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  news: newsReducer,
  converter: converterReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(coinApi.middleware, newsApi.middleware, authApi.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
