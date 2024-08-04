import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  PayloadAction,
  EntityState,
} from '@reduxjs/toolkit';
import useHttp from '../../useHttp/useHttp';
import { RootState } from '../store';

type ProductItem = {
  _id: string;
  title: string;
  price: string | number;
  description: string;
  previewImage: string;
  bigImage: string;
  category: string;
};

type ProductState = EntityState<ProductItem, string> & {
  productsLoadingStatus: string;
  singleProductLoadingStatus: string;
  visibleItems: ProductItem[];
  filteredItems: ProductItem[];
  searchedProducts: ProductItem[];
  itemsToShow: number;
  currentPage: number;
  favToShow: number;
  allItemsLoaded: boolean;
};

const productsAdapter = createEntityAdapter<ProductItem, string>({
  selectId: (product) => product._id,
});

const initialState: ProductState = productsAdapter.getInitialState({
  productsLoadingStatus: 'idle',
  singleProductLoadingStatus: 'idle',
  visibleItems: [],
  filteredItems: [],
  searchedProducts: [],
  itemsToShow: 20,
  currentPage: 1,
  favToShow: 8,
  allItemsLoaded: false,
});

export const fetchProducts = createAsyncThunk<
  ProductItem[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async () => {
  const { request } = useHttp();
  return request({
    url: 'http://localhost:3000/products',
    method: 'GET',
  });
});

export const fetchSingleProduct = createAsyncThunk<
  { product: ProductItem },
  string,
  { rejectValue: string }
>('product/fetchSingleProduct', async (prodId: string) => {
  const { request } = useHttp();
  return request({
    url: `http://localhost:3000/products/singleProduct?prodId=${encodeURIComponent(
      prodId
    )}`,
    method: 'GET',
  });
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getPagedItems: (state, action: PayloadAction<number>) => {
      const page = action.payload;
      state.currentPage = page;
      const itemsArray = state.filteredItems;

      const firstIndex = (page - 1) * state.itemsToShow;
      const lastIndex = firstIndex + state.itemsToShow;
      state.visibleItems = itemsArray.slice(firstIndex, lastIndex);
    },
    getFavoriteItems: (state, action: PayloadAction<string[]>) => {
      const itemsToShow = state.favToShow;
      const ids = action.payload;
      const itemsArray = Object.values(state.entities);

      const filteredItems = itemsArray
        .filter((item) => ids.includes(item._id))
        .slice(0, itemsToShow);

      state.visibleItems = filteredItems;
      if (filteredItems.length >= ids.length) {
        state.allItemsLoaded = true;
      }
      state.favToShow += 8;
    },
    resetFav: (state) => {
      state.favToShow = 8;
      state.allItemsLoaded = false;
    },
    getFilteredItems: (
      state,
      action: PayloadAction<{ category: string; min: number; max: number }>
    ) => {
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
    getSingleItem: (state, action: PayloadAction<string>) => {
      const itemsArray = Object.values(state.entities);
      state.visibleItems = itemsArray.filter(
        (item) => item._id === action.payload
      );
    },
    getSearchedItem: (state, action: PayloadAction<string>) => {
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
    sortProducts: (state, action: PayloadAction<string>) => {
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
  resetFav,
  getFavoriteItems,
  resetFilters,
  getSingleItem,
  getSearchedItem,
  displaySearchResults,
  sortProducts,
} = actions;
