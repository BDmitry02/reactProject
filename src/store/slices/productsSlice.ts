import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import useHttp from "../../utils/useHttp/useHttp";
import { RootState } from "../store";

interface Product {
  _id: string;
  title: string;
  price: string;
  description: string;
  previewImage: string;
  bigImage: string;
  category: string;
}

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
});

const initialState = productsAdapter.getInitialState({
  productsLoadingStatus: "idle",
  visibleItems: [] as Product[],
  itemsToShow: 20,
  lastIndex: 0,
  currentPage: 1,
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
      const page = action.payload;
      state.currentPage = page;
      const itemsArray = Object.values(state.entities);
      const firstIndex = (page - 1) * state.itemsToShow;
      const lastIndex = firstIndex + state.itemsToShow;
      state.visibleItems = itemsArray.slice(firstIndex, lastIndex);
    },
    getFavoriteItems: (state, action) => {
      const ids = action.payload;
      const itemsArray = Object.values(state.entities);
      state.visibleItems = itemsArray.filter((item) => ids.includes(item._id));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoadingStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoadingStatus = "success";
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
export const { loadMore, getPagedItems, getFavoriteItems } = actions;
