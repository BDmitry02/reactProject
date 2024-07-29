import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import useHttp from "../../useHttp/useHttp";
import { RootState } from "../store";

type Filter = {
  id: string;
};

const filtersAdapter = createEntityAdapter<Filter>({
  selectId: (filter) => filter, // Указываем правильное поле идентификатора
});

const initialState = filtersAdapter.getInitialState({
  filtersCategoriesLoadingStatus: "idle",
  filtersPriceLoadingStatus: "idle",
  priceFilter: {},
});

export const fetchCategories = createAsyncThunk("filters/fetchFilters", () => {
  const { request } = useHttp();
  return request({
    url: "http://localhost:4000/categories",
    method: "GET",
    body: null,
  });
});

export const fetchPriceFilter = createAsyncThunk(
  "filters/fetchPriceFilters",
  () => {
    const { request } = useHttp();
    return request({
      url: "http://localhost:4000/price",
      method: "GET",
      body: null,
    });
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.filtersCategoriesLoadingStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.filtersCategoriesLoadingStatus = "success";
        filtersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.filtersCategoriesLoadingStatus = "error";
        console.error("Error fetching products:", action.payload);
      })

      .addCase(fetchPriceFilter.pending, (state) => {
        state.filtersPriceLoadingStatus = "loading";
      })
      .addCase(fetchPriceFilter.fulfilled, (state, action) => {
        state.filtersPriceLoadingStatus = "success";
        state.priceFilter = action.payload;
      })
      .addCase(fetchPriceFilter.rejected, (state, action) => {
        state.filtersPriceLoadingStatus = "error";
        console.error("Error fetching products:", action.payload);
      });
  },
});

const { actions, reducer } = filtersSlice;

export const { selectAll } = filtersAdapter.getSelectors<RootState>(
  (state) => state.filters
);

export default reducer;
export const { activeFilterChanged } = actions;
