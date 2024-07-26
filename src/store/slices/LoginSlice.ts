import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import useHttp from "../../utils/useHttp/useHttp";
import { RootState } from "../store";

const loginAdapter = createEntityAdapter({
  selectId: (prodId) => prodId,
});

const initialState = loginAdapter.getInitialState({
  isLogged: localStorage.getItem("isLogged") === "true" || false,
  userId: localStorage.getItem("userId") || "",
});

export const addToFav = createAsyncThunk("login/addToFav", (userId, prodId) => {
  const { request } = useHttp();
  return request({
    url: "http://localhost:4000/favorite",
    method: "POST",
    body: { userId, prodId },
  });
});

export const fetchFav = createAsyncThunk(
  "login/fetchFav",
  async (userId: string) => {
    const { request } = useHttp();
    return request({
      url: `http://localhost:3000/favorite?userId=${encodeURIComponent(
        userId
      )}`,
      method: "GET",
      body: null,
    });
  }
);

const loginSlice = createSlice({
  favLoadingStatus: "idle",
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
    addNewFav: (state, action) => {
      const newFav = action.payload;
      loginAdapter.addOne(state, newFav);
    },
    removeFav: (state, action) => {
      loginAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFav.pending, (state) => {
        state.favLoadingStatus = "loading";
      })
      .addCase(fetchFav.fulfilled, (state, action) => {
        state.favLoadingStatus = "success";
        action.payload.favorite.forEach((element) => {
          loginAdapter.addOne(state, element);
        });
      })
      .addCase(fetchFav.rejected, (state, action) => {
        state.favLoadingStatus = "error";
        console.error("Error fetching products:", action.payload);
      });
  },
});

const { actions, reducer } = loginSlice;

export const { selectAll } = loginAdapter.getSelectors<RootState>(
  (state) => state.login
);

export default reducer;
export const { logIn, logOut, setUserId, addNewFav, removeFav } = actions;
