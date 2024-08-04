import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useHttp from '../../useHttp/useHttp';

type FilterState = {
  filtersCategoriesLoadingStatus: string;
  filtersPriceLoadingStatus: string;
  priceFilter: { min: number; max: number };
  categoryFilter: string[];
};

const initialState: FilterState = {
  filtersCategoriesLoadingStatus: 'idle',
  filtersPriceLoadingStatus: 'idle',
  priceFilter: { min: 0, max: 0 },
  categoryFilter: [],
};

export const fetchCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>('filters/fetchFilters', () => {
  const { request } = useHttp();
  return request({
    url: 'http://localhost:3000/products/categories',
    method: 'GET',
    body: null,
  });
});

export const fetchPriceFilter = createAsyncThunk<
  { min: number; max: number },
  void,
  { rejectValue: string }
>('filters/fetchPriceFilters', () => {
  const { request } = useHttp();
  return request({
    url: 'http://localhost:3000/products/price',
    method: 'GET',
    body: null,
  });
});

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.filtersCategoriesLoadingStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.filtersCategoriesLoadingStatus = 'success';
        state.categoryFilter = [];
        state.categoryFilter = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.filtersCategoriesLoadingStatus = 'error';
        console.error('Error fetching products:', action.payload);
      })

      .addCase(fetchPriceFilter.pending, (state) => {
        state.filtersPriceLoadingStatus = 'loading';
      })
      .addCase(fetchPriceFilter.fulfilled, (state, action) => {
        state.filtersPriceLoadingStatus = 'success';
        state.priceFilter = action.payload;
      })
      .addCase(fetchPriceFilter.rejected, (state, action) => {
        state.filtersPriceLoadingStatus = 'error';
        console.error('Error fetching products:', action.payload);
      });
  },
});

const { reducer } = filtersSlice;

export default reducer;
