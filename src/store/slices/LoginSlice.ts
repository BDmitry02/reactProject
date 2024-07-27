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
  favLoadingStatus: "idle",
  favProdLoadingStatus: "idle",
  isLogged: localStorage.getItem("isLogged") === "true" || false,
  userId: localStorage.getItem("userId") || "",
  favoriteItems: [],
});

export const addToFav = createAsyncThunk(
  "login/addToFav",
  async ({ userId, prodId }) => {
    const { request } = useHttp();
    return request({
      url: "http://localhost:3000/favorite",
      method: "POST",
      body: JSON.stringify({ userId, prodId }),
    });
  }
);

export const removeFromFav = createAsyncThunk(
  "login/removeFromFav",
  async ({ userId, prodId }: { userId: string; prodId: string }) => {
    const { request } = useHttp();
    return request({
      url: "http://localhost:3000/favorite",
      method: "DELETE",
      body: JSON.stringify({ userId, prodId }),
    });
  }
);

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

export const fetchFavoriteItems = createAsyncThunk(
  "login/fetchFavoriteItems",
  async (itemIds: string) => {
    const { request } = useHttp();
    return request({
      url: `http://localhost:4000/favoriteItems`,
      method: "POST",
      body: JSON.stringify({ itemIds }),
    });
  }
);

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
      })

      .addCase(fetchFavoriteItems.pending, (state) => {
        state.favProdLoadingStatus = "loading";
      })
      .addCase(fetchFavoriteItems.fulfilled, (state, action) => {
        state.favoriteItems = [];
        state.favProdLoadingStatus = "success";
        state.favoriteItems.push(...action.payload);
      })
      .addCase(fetchFavoriteItems.rejected, (state, action) => {
        state.favProdLoadingStatus = "error";
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
