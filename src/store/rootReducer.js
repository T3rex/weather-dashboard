import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice/weatherSlice";
import favoritesReducer from "./favoritesSlice/favoriteSlice";
import settingsReducer from "./settingsSlice/settingsSlice";

const rootReducer = combineReducers({
  weather: weatherReducer,
  favorites: favoritesReducer,
  settings: settingsReducer,
});

export default rootReducer;
