import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import useHttp from "../../utils/useHttp/useHttp";
import { RootState } from "../store";

interface Product {
  _id: string;
}

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
});

const initialState = productsAdapter.getInitialState({
  productsLoadingStatus: "idle",
  visibleItems: [] as Product[],
  itemsToShow: 20,
  lastIndex: 0,
});

export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetchProducts",
  () => {
    const { request } = useHttp();
    return request({
      url: "http://localhost:4000/products",
      method: "GET",
      body: null,
    });
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadMore: (state) => {
      const itemsArray = Object.values(state.entities);
      const newLastIndex = state.lastIndex + state.itemsToShow;
      const nextItems = itemsArray.slice(state.lastIndex, newLastIndex);
      state.visibleItems = [...state.visibleItems, ...nextItems];
      state.lastIndex = newLastIndex;
    },
    getPagedItems: (state, action) => {
      const itemsArray = Object.values(state.entities);
      const firstIndex = action.payload * 20;
      const LastIndex = firstIndex + 20;
      const nextItems = itemsArray.slice(firstIndex, LastIndex);
      state.visibleItems = [...nextItems];
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoadingStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoadingStatus = "idle";
        productsAdapter.setAll(state, action.payload);
        state.visibleItems = action.payload.slice(0, 20);
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
export const { loadMore, getPagedItems } = actions;
