import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const city = action.payload;
      if (!state.cities.includes(city)) {
        state.cities.push(city);
      }
    },
    removeFavorite(state, action) {
      const city = action.payload;
      state.cities = state.cities.filter((c) => c !== city);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
