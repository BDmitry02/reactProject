import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import useHttp from '../../useHttp/useHttp';
import { RootState } from '../store';
import { EntityId } from '@reduxjs/toolkit';

interface Product {
  _id: string;
  title: string;
  price: string | number;
  description: string;
  previewImage: string;
  bigImage: string;
  category: string;
}

const productsAdapter = createEntityAdapter<Product, EntityId>({
  selectId: (product) => product._id,
});

const initialState = productsAdapter.getInitialState({
  productsLoadingStatus: 'idle',
  singleProductLoadingStatus: 'idle',
  visibleItems: [] as Product[],
  filteredItems: [] as Product[],
  searchedProducts: [] as Product[],
  itemsToShow: 20,
  lastIndex: 0,
  currentPage: 1,
});

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { request } = useHttp();
    return request({
      url: 'http://localhost:3000/products',
      method: 'GET',
    });
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (prodId: string) => {
    const { request } = useHttp();
    return request({
      url: `http://localhost:3000/products/singleProduct?prodId=${encodeURIComponent(
        prodId
      )}`,
      method: 'GET',
    });
  }
);

const productsSlice = createSlice({
  name: 'products',
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
        const isInCategory = category === 'all' || item.category === category;
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
    displaySearchResults: (state) => {
      state.filteredItems = state.searchedProducts;
    },
    sortProducts: (state, action) => {
      const sortBy = action.payload;
      switch (sortBy) {
        case 'priceAscending':
          state.filteredItems.sort(
            (a, b) => parseFloat(String(a.price)) - parseFloat(String(b.price))
          );
          break;
        case 'priceDescending':
          state.filteredItems.sort(
            (a, b) => parseFloat(String(b.price)) - parseFloat(String(a.price))
          );
          break;
        case 'fromAtoZ':
          state.filteredItems.sort((a, b) => a.title.localeCompare(b.title));
          break;

        case 'fromZtoA':
          state.filteredItems.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          state.filteredItems = Object.values(state.entities);
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoadingStatus = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoadingStatus = 'success';
        state.filteredItems.push(...action.payload);
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.productsLoadingStatus = 'error';
        console.error('Error fetching products:', action.payload);
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductLoadingStatus = 'loading';
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductLoadingStatus = 'success';
        state.visibleItems = [];
        state.visibleItems.push(action.payload.product);
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleProductLoadingStatus = 'error';
        console.error('Error fetching products:', action.payload);
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
  displaySearchResults,
  sortProducts,
} = actions;
