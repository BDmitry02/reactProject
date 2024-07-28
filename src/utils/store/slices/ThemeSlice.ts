import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const themeAdapter = createEntityAdapter();

const initialState = themeAdapter.getInitialState({
  theme: localStorage.getItem("theme") || "light",
});

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    activeThemeChanged: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

const { actions, reducer } = themeSlice;

export default reducer;
export const { activeThemeChanged } = actions;
