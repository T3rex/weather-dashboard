import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: ["Delhi", "London", "New York", "Berlin", "Paris", "Moscow"],
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCity(state, action) {
      state.cities = [...state.cities, action.payload];
    },
  },
});

export const { addCity } = weatherSlice.actions;
export default weatherSlice.reducer;
