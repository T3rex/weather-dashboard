import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { weatherApi } from "./api/weatherApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    root: rootReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
  preloadedState: {
    root: {
      settings: {
        unit: localStorage.getItem("unit") || "C",
      },
      favorites: {
        cities: JSON.parse(localStorage.getItem("favorites")) || [],
      },
    },
  },
});

setupListeners(store.dispatch);
