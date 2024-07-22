import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const loginAdapter = createEntityAdapter();

const initialState = loginAdapter.getInitialState({
  isLogged: localStorage.getItem("isLogged") === "true" || false,
  userId: localStorage.getItem("userId") || "",
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLogged = true;
      localStorage.setItem("isLogged", "true");
    },
    logOut: (state) => {
      state.isLogged = false;
      localStorage.setItem("isLogged", "false");
      localStorage.setItem("userId", "");
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
  },
});

const { actions, reducer } = loginSlice;

export default reducer;
export const { logIn, logOut, setUserId } = actions;
