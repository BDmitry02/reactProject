import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import useHttp from "../../useHttp/useHttp";
import { RootState } from "../store";

interface Product {
  _id: string;
  title: string;
  price: string | number;
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
  singleProductLoadingStatus: "idle",
  visibleItems: [] as Product[],
  filteredItems: [] as Product[],
  searchedProducts: [] as Product[],
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

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (prodId: string) => {
    const { request } = useHttp();
    return request({
      url: `http://localhost:4000/singleProduct?prodId=${encodeURIComponent(
        prodId
      )}`,
      method: "GET",
      body: null,
    });
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getPagedItems: (state, action) => {
      const page = action.payload;
      state.currentPage = page;
      const itemsArray = state.filteredItems;

      const firstIndex = (page - 1) * state.itemsToShow;
      const lastIndex = firstIndex + state.itemsToShow;
      state.visibleItems = itemsArray.slice(firstIndex, lastIndex);
    },
    getFavoriteItems: (state, action) => {
      const ids = action.payload;
      const itemsArray = Object.values(state.entities);
      state.visibleItems = itemsArray.filter((item) => ids.includes(item._id));
    },
    getFilteredItems: (state, action) => {
      const { category, min, max } = action.payload;
      const itemsArray = Object.values(state.entities);

      const normalizedItemsArray = itemsArray.map((item) => ({
        ...item,
        price: parseFloat(item.price as string),
      }));

      state.filteredItems = normalizedItemsArray.filter((item) => {
        const isInPriceRange = item.price >= min && item.price <= max;
        const isInCategory = category === "all" || item.category === category;
        return isInPriceRange && isInCategory;
      });
    },
    resetFilters: (state) => {
      state.filteredItems = Object.values(state.entities);
    },
    getSingleItem: (state, action) => {
      const itemsArray = Object.values(state.entities);
      state.visibleItems = itemsArray.filter(
        (item) => item._id === action.payload
      );
    },
    getSearchedItem: (state, action) => {
      const itemsArray = Object.values(state.entities);
      state.searchedProducts = itemsArray.filter((item) =>
        item.title
          .toLocaleLowerCase()
          .includes(action.payload.toLocaleLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoadingStatus = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoadingStatus = "success";
        state.filteredItems.push(...action.payload);
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoadingStatus = "error";
        console.error("Error fetching products:", action.payload);
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductLoadingStatus = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductLoadingStatus = "success";
        state.visibleItems = [];
        state.visibleItems.push(action.payload.product);
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleProductLoadingStatus = "error";
        console.error("Error fetching products:", action.payload);
      });
  },
});

const { actions, reducer } = productsSlice;

export const { selectAll } = productsAdapter.getSelectors<RootState>(
  (state) => state.products
);

export default reducer;
export const {
  getFilteredItems,
  getPagedItems,
  getFavoriteItems,
  resetFilters,
  getSingleItem,
  getSearchedItem,
} = actions;
