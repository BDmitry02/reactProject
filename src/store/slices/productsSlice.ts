import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import useHttp from "../../utils/useHttp/useHttp";
import { RootState } from "../store";

const productsAdapter = createEntityAdapter({
  selectId: (product) => product._id,
});

const initialState = productsAdapter.getInitialState({
  productsLoadingStatus: "idle",
});

export const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
  const { request } = useHttp();
  return request({
    url: "http://localhost:4000/products",
    method: "GET",
    body: null,
  });
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoadingStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoadingStatus = "idle";
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoadingStatus = "error";
        console.error("Error fetching products:", action.payload);
      });
  },
});

const { actions, reducer } = productsSlice;

export const { selectAll } = productsAdapter.getSelectors<RootState>(
  (state) => state.products
);

export default reducer;
export const { productsFetching, productsFetched, productsFetchingError } =
  actions;
