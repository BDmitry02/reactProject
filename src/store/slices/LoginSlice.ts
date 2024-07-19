import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: localStorage.getItem("isLogged") === "true" || false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn(state) {
      state.isLogged = true;
      // localStorage.setItem("isLogged", "true");
    },
    logOut(state) {
      state.isLogged = false;
      // localStorage.setItem("isLogged", "false");
    },
  },
});

const { actions, reducer } = loginSlice;

export default reducer;
export const { logIn, logOut } = actions;
