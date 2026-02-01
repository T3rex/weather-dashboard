import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unit: "C",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleUnit(state) {
      state.unit = state.unit === "C" ? "F" : "C";
    },
    setUnit(state, action) {
      state.unit = action.payload;
    },
  },
});

export const { toggleUnit, setUnit } = settingsSlice.actions;
export default settingsSlice.reducer;
