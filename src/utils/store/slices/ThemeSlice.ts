import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type themeState = {
  theme: string;
};

const initialState: themeState = {
  theme: localStorage.getItem('theme') || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    activeThemeChanged: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

const { actions, reducer } = themeSlice;

export default reducer;
export const { activeThemeChanged } = actions;
